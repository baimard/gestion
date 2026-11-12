#!/usr/bin/env python3
"""Build the Pages site using current tooling and documentation from release tags."""
import html
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'documentation/source'
OUTPUT = ROOT / 'documentation/build/versions'
BASELINE = (3, 4, 0)
TAG = re.compile(r'v?(\d+)\.(\d+)\.(\d+)\Z')


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)


def build(source, target, version):
    subprocess.run([
        sys.executable, '-m', 'sphinx', '-W', '--keep-going', '-E', '-b', 'html',
        '-c', str(SOURCE), '-D', f'version={version}', '-D', f'release={version}',
        '-D', f'html_title=Gestion {version}', str(source), str(target),
    ], check=True, cwd=ROOT)


def decorate(versions, stable):
    """Render links ahead of time: no API or network dependency in the selector."""
    sites = versions + [dict(stable, path='')]
    for site in sites:
        for page in site['pages']:
            file = OUTPUT / site['path'] / page
            links = []
            for version in versions:
                destination = page if page in version['pages'] else 'index.html'
                url = os.path.relpath(OUTPUT / version['path'] / destination, file.parent)
                label = html.escape(version['label'])
                current = ' aria-current="page"' if version['id'] == site['id'] else ''
                links.append(f'<li><a href="{html.escape(url, quote=True)}"{current}>{label}</a></li>')
            picker = ('<details class="gestion-doc-versions">'
                      '<summary aria-label="Choisir la version de la documentation">Version : '
                      + html.escape(site['label']) + '</summary>'
                      '<nav aria-label="Version de la documentation"><ul>'
                      + ''.join(links) + '</ul></nav></details>')
            prefix = os.path.relpath(OUTPUT, file.parent).replace(os.sep, '/')
            resources = (f'<link rel="stylesheet" href="{prefix}/_version-picker.css">'
                         f'<script defer src="{prefix}/_version-picker.js"></script>')
            content = file.read_text()
            content = content.replace('</head>', resources + '</head>', 1)
            sidebar = r'(<nav\b[^>]*class="wy-nav-side"[^>]*>.*?)(</nav>)'
            if re.search(sidebar, content, flags=re.DOTALL):
                # Outside the scrolling menu, pinned to the bottom of the sidebar.
                content = re.sub(sidebar, lambda m: m[1] + picker + m[2],
                                 content, count=1, flags=re.DOTALL)
            else:
                content = re.sub(r'(<body\b[^>]*>)', lambda m: m[0] + picker, content, count=1)
            file.write_text(content)
    for extension in ('js', 'css'):
        shutil.copyfile(ROOT / f'documentation/version-picker.{extension}', OUTPUT / f'_version-picker.{extension}')


def main():
    # Only this dedicated generated directory is replaced. All release folders
    # are reconstructed from their tags on each publication, never from master.
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir(parents=True)
    releases = {}
    for tag in git('tag', '--list').decode().splitlines():
        match = TAG.fullmatch(tag)
        if match and tuple(map(int, match.groups())) >= BASELINE:
            version = '.'.join(match.groups())
            if version not in releases or tag == version:
                releases[version] = tag
    archives = []
    for version in sorted(releases, key=lambda v: tuple(map(int, v.split('.'))), reverse=True):
        tag = releases[version]
        if not git('ls-tree', '--name-only', tag, 'documentation/source/index.rst').strip():
            print(f'Skipping {tag}: no documentation sources.', flush=True)
            continue
        manifest = ET.fromstring(git('show', f'{tag}:appinfo/info.xml'))
        if manifest.findtext('version') != version:
            raise ValueError(f'Tag {tag} does not match its application manifest')
        with tempfile.TemporaryDirectory(prefix='gestion-docs-') as temporary:
            archive_path = Path(temporary) / 'sources.tar'
            archive_path.write_bytes(git('archive', tag, 'documentation/source'))
            with tarfile.open(archive_path) as archive:
                archive.extractall(temporary, filter='data')
            # Historical conf.py is intentionally not executed. Use today's
            # toolchain/configuration and the archived RST/media only.
            build(Path(temporary) / 'documentation/source', OUTPUT / version, version)
        archives.append({'id': version, 'label': version, 'path': version + '/',
                         'commit': git('rev-parse', tag + '^{commit}').decode().strip()})
    development_version = ET.parse(ROOT / 'appinfo/info.xml').findtext('version')
    build(SOURCE, OUTPUT / 'dev', development_version + '-dev')
    development = {'id': 'dev', 'label': 'Développement', 'path': 'dev/',
                   'commit': git('rev-parse', 'HEAD').decode().strip()}
    latest = archives[0] if archives else development
    shutil.copytree(OUTPUT / latest['path'], OUTPUT / 'stable')
    stable = dict(latest, id='stable', path='stable/', label=f"Stable ({latest['id']})" if archives else 'Documentation courante')
    # Keep old /gestion/page.html bookmarks working as aliases of stable.
    for item in (OUTPUT / 'stable').iterdir():
        if item.is_dir():
            shutil.copytree(item, OUTPUT / item.name)
        else:
            shutil.copyfile(item, OUTPUT / item.name)
    versions = [stable, *archives, development]
    for version in versions:
        version['pages'] = sorted(str(p.relative_to(OUTPUT / version['path']))
                                  for p in (OUTPUT / version['path']).rglob('*.html'))
    decorate(versions, stable)
    (OUTPUT / 'versions.json').write_text(json.dumps(versions, ensure_ascii=False, indent=2) + '\n')
    (OUTPUT / '.nojekyll').touch()
    print('Published documentation choices: ' + ', '.join(v['label'] for v in versions), flush=True)


if __name__ == '__main__':
    main()

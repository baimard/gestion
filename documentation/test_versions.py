"""Exercise real Sphinx builds against disposable Git release histories."""
import contextlib
import io
import json
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

import build_versions as publication


class VersionedDocumentationTest(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.original = publication.ROOT, publication.SOURCE, publication.OUTPUT
        self.addCleanup(self.restore)
        publication.ROOT = self.root
        publication.SOURCE = self.root / 'documentation/source'
        publication.OUTPUT = self.root / 'site'
        publication.SOURCE.mkdir(parents=True)
        (self.root / 'appinfo').mkdir()
        (publication.SOURCE / 'conf.py').write_text("project = 'Fixture'\n")
        for extension in ('js', 'css'):
            shutil.copyfile(self.original[0] / f'documentation/version-picker.{extension}',
                            self.root / f'documentation/version-picker.{extension}')
        self.git('init', '-q')
        self.git('config', 'user.name', 'Documentation test')
        self.git('config', 'user.email', 'test@example.invalid')
        (self.root / '.gitignore').write_text('site/\n')
        (self.root / 'appinfo/info.xml').write_text('<info><version>3.3.9</version></info>')
        self.commit('No historical sources')
        self.git('tag', '3.3.9')

    def restore(self):
        publication.ROOT, publication.SOURCE, publication.OUTPUT = self.original

    def git(self, *args):
        return subprocess.check_output(['git', *args], cwd=self.root)

    def commit(self, message):
        self.git('add', '.')
        self.git('commit', '-qm', message)

    def release(self, version, content):
        (self.root / 'appinfo/info.xml').write_text(f'<info><version>{version}</version></info>')
        (publication.SOURCE / 'index.rst').write_text('Guide\n=====\n\n' + content + '\n')
        self.commit(version)
        self.git('tag', version)

    def build(self):
        # Sphinx output remains available on failure while keeping CI readable.
        with contextlib.redirect_stdout(io.StringIO()):
            publication.main()
        return publication.OUTPUT

    def test_release_history_survives_new_release_and_page_falls_back(self):
        self.release('3.4.0', 'Original release instructions.')
        self.release('3.4.1', 'New stable instructions.')
        (publication.SOURCE / 'index.rst').write_text('Guide\n=====\n\n.. toctree::\n\n   new_feature\n')
        (publication.SOURCE / 'new_feature.rst').write_text('Future feature\n==============\n\nDevelopment only.\n')
        site = self.build()
        self.assertIn('Original release instructions.', (site / '3.4.0/index.html').read_text())
        self.assertIn('New stable instructions.', (site / 'stable/index.html').read_text())
        future = (site / 'dev/new_feature.html').read_text()
        self.assertIn('value="../3.4.0/index.html"', future)
        self.assertIn('value="new_feature.html" selected', future)
        self.assertIn('<noscript>', future)
        self.assertTrue((site / 'index.html').exists())
        self.release('3.4.2', '.. toctree::\n\n   new_feature\n')
        site = self.build()
        versions = json.loads((site / 'versions.json').read_text())
        self.assertEqual([v['id'] for v in versions], ['stable', '3.4.2', '3.4.1', '3.4.0', 'dev'])
        self.assertIn('Original release instructions.', (site / '3.4.0/index.html').read_text())
        self.assertIn('Future feature', (site / 'stable/new_feature.html').read_text())

    def test_mismatched_release_manifest_stops_publication(self):
        self.release('3.4.0', 'Release instructions.')
        self.git('tag', '3.4.1')
        with self.assertRaisesRegex(ValueError, 'manifest'):
            self.build()


if __name__ == '__main__':
    unittest.main()

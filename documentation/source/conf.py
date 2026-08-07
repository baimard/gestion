from pathlib import Path
import defusedxml.ElementTree as ET


def setup(app):
    app.add_css_file('my_theme.css')


project = 'Gestion pour Nextcloud'
copyright = '2021-2026, Benjamin AIMARD'
author = 'Benjamin AIMARD'

info_xml = Path(__file__).resolve().parents[2] / 'appinfo' / 'info.xml'
release = ET.parse(info_xml).getroot().findtext('version', default='inconnue')
version = release

extensions = ['sphinx_rtd_theme', 'sphinxcontrib.video']
templates_path = ['_templates']
language = 'fr'
exclude_patterns = ['_build']

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
html_title = f'Gestion {release}'
html_theme_options = {
    'navigation_depth': 3,
    'collapse_navigation': False,
}

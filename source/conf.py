def setup(app):
    app.add_css_file('my_theme.css')


project = 'Gestion pour Nextcloud'
copyright = '2021-2026, Benjamin AIMARD'
author = 'Benjamin AIMARD'

# Standalone gh-pages branch: application metadata lives on master.
release = '3.4.2'
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

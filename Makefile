# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

init: 
	docker run -it --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker sphinx-quickstart

site:
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker rm -rf /docs/docs
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker make html
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker mv /docs/build/html /docs/docs
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker touch /docs/docs/.nojekyll
	sudo mkdir -p docs/_sources/videos
	sudo cp source/videos/* docs/_sources/videos
	sudo chown -R $$(whoami):$$(whoami) docs

site-a:
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker rm -rf /docs/docs
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker make clean html
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker mv /docs/build/html /docs/docs
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker touch /docs/docs/.nojekyll
	sudo mkdir -p docs/_sources/videos
	sudo cp source/videos/* docs/_sources/videos
	sudo chown -R $$(whoami):$$(whoami) docs

my-pdf: 
	docker run --rm -v $$PWD:/docs registry.gitlab.com/baimard/sphinx-doc-docker make latexpdf

docker-build:
	docker build . -t registry.gitlab.com/baimard/sphinx-doc-docker

docker-push: docker-build
	docker push registry.gitlab.com/baimard/sphinx-doc-docker

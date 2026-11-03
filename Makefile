SPHINXBUILD ?= python -m sphinx
SPHINXOPTS ?= -W --keep-going
SOURCEDIR = source
BUILDDIR = build

.PHONY: help html site site-a clean
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)"

html:
	$(SPHINXBUILD) $(SPHINXOPTS) -d "$(BUILDDIR)/doctrees" -b html "$(SOURCEDIR)" "$(BUILDDIR)/html"

site:
	rm -rf "$(BUILDDIR)/site"
	$(SPHINXBUILD) $(SPHINXOPTS) -E -d "$(BUILDDIR)/doctrees" -b html "$(SOURCEDIR)" "$(BUILDDIR)/site"
	touch "$(BUILDDIR)/site/.nojekyll"
	rm -rf docs
	mv "$(BUILDDIR)/site" docs

site-a: site

clean:
	rm -rf "$(BUILDDIR)" docs

%:
	$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS)

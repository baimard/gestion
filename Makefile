app_name=$(notdir $(CURDIR))
build_tools_directory=$(CURDIR)/build/tools
source_build_directory=$(CURDIR)/build/artifacts/source
source_package_name=$(source_build_directory)/$(app_name)
appstore_build_directory=$(CURDIR)/build/artifacts/appstore
appstore_package_name=$(appstore_build_directory)/$(app_name)
npm=$(shell which npm 2> /dev/null)
composer=$(shell which composer 2> /dev/null)

all: build 
allnew: dev-setup lint build-js-production test
dev-setup: clean clean-dev composer npm-init

npm-init:
	npm i

write:
	sudo chown -R www-data:$$(whoami) ../gestion ; sudo chmod -R 775 ../gestion

npm-update:
	npm update

build-js:
	npm run dev

build-js-production:
	npm run build

watch-js:
	npm run watch

# Linting
lint:
	npm run lint

lint-fix:
	npm run lint:fix

# Style linting
stylelint:
	npm run stylelint

stylelint-fix:
	npm run stylelint:fix

# Removes the appstore build
.PHONY: clean
clean:
	rm -rf ./build

# Same as clean but also removes dependencies installed by composer, bower and
# npm
.PHONY: distclean
distclean: clean
	rm -rf vendor
	rm -rf node_modules

clean-dev:
	rm -rf node_modules

# Fetches the PHP and JS dependencies and compiles the JS. If no composer.json
# is present, the composer step is skipped, if no package.json or js/package.json
# is present, the npm step is skipped
.PHONY: build
build:
	ifneq (,$(wildcard $(CURDIR)/composer.json))
		make composer
	endif
	ifneq (,$(wildcard $(CURDIR)/package.json))
		make npm
	endif
	ifneq (,$(wildcard $(CURDIR)/js/package.json))
		make npm
	endif

# # Installs and updates the composer dependencies. If composer is not installed
# # a copy is fetched from the web
.PHONY: composer
composer:
	php composer.phar install --prefer-dist
	php composer.phar update --prefer-dist

# Installs npm dependencies
.PHONY: npm
npm:
	ifeq (,$(wildcard $(CURDIR)/package.json))
		cd js && $(npm) run build
	else
		npm run build
	endif

# Builds the source and appstore package
.PHONY: dist
dist:
	make source
	make appstore

# Builds the source package
.PHONY: source
source:
	rm -rf $(source_build_directory)
	mkdir -p $(source_build_directory)
	tar cvzf $(source_package_name).tar.gz \
	--exclude-vcs \
	--exclude="../$(app_name)/composer.json" \
	--exclude="../$(app_name)/package*" \
	--exclude="../$(app_name)/tests" \
	--exclude="../$(app_name)/src" \
	--exclude="../$(app_name)/build" \
	--exclude="../$(app_name)/js/node_modules" \
	--exclude="../$(app_name)/node_modules" \
	--exclude="../$(app_name)/*.log" \
	--exclude="../$(app_name)/js/*.log" \
 	../$(app_name)

# Builds the source package for the app store, ignores php and js tests
.PHONY: appstore
appstore:
	rm -rf $(appstore_build_directory)
	mkdir -p $(appstore_build_directory)
	tar cvzf $(appstore_package_name).tar.gz \
	--exclude-vcs \
	--exclude="../$(app_name)/build" \
	--exclude="../$(app_name)/tests" \
	--exclude="../$(app_name)/Makefile" \
	--exclude="../$(app_name)/*.log" \
	--exclude="../$(app_name)/phpunit*xml" \
	--exclude="../$(app_name)/composer.*" \
	--exclude="../$(app_name)/js/node_modules" \
	--exclude="../$(app_name)/node_modules" \
	--exclude="../$(app_name)/webpack.js" \
	--exclude="../$(app_name)/package-lock.json" \
	--exclude="../$(app_name)/README.*" \
	--exclude="../$(app_name)/js/tests" \
	--exclude="../$(app_name)/js/test" \
	--exclude="../$(app_name)/js/*.log" \
	--exclude="../$(app_name)/js/package.json" \
	--exclude="../$(app_name)/js/bower.json" \
	--exclude="../$(app_name)/js/karma.*" \
	--exclude="../$(app_name)/js/protractor.*" \
	--exclude="../$(app_name)/package.json" \
	--exclude="../$(app_name)/bower.json" \
	--exclude="../$(app_name)/translationtool.phar" \
	--exclude="../$(app_name)/karma.*" \
	--exclude="../$(app_name)/protractor\.*" \
	--exclude="../$(app_name)/.*" \
	--exclude="../$(app_name)/src" \
	--exclude="../$(app_name)/js/.*" \
	--exclude="../$(app_name)/vendor" \
	--exclude="../$(app_name)/drivers" \
	../$(app_name)

.PHONY: test
test:
	$(CURDIR)/vendor/phpunit/phpunit/phpunit -c phpunit.xml --debug --colors
#$(CURDIR)/vendor/phpunit/phpunit/phpunit -c phpunit.integration.xml

.PHONY: testPanther
testPanther:
	killall geckodriver; php tests/Unit/Panther/IhmTest.php

translate:
	./translationtool.phar convert-po-files

.PHONY: translationtool.phar
translationtool.phar: install-composer-deps
	php -d phar.readonly=off vendor/bin/phar-composer build src
	chmod +x translationtool.phar

install-composer-deps: composer.phar
	php composer.phar install
	php composer.phar install -d src

composer.phar:
	curl -sS https://getcomposer.org/installer | php

cleanComposer:
	rm -f translationtool.phar composer.lock src/composer.lock
	rm -rf vendor src/vendor
app_name=$(notdir $(CURDIR))
build_tools_directory=$(CURDIR)/build/tools
source_build_directory=$(CURDIR)/build/artifacts/source
source_package_name=$(source_build_directory)/$(app_name)
appstore_build_directory=$(CURDIR)/build/artifacts/appstore
appstore_package_name=$(appstore_build_directory)/$(app_name)
appstore_package_dir=$(appstore_build_directory)/$(app_name)
occ=occ
APP_PRIVATE_KEY=
APP_CERTIFICATE=
npm=$(shell which npm 2> /dev/null)
composer=$(shell which composer 2> /dev/null)

all: build
allnew: dev-setup lint build-js-production test
dev-setup: clean clean-dev composer npm-init build-js

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

.PHONY: verify-js-production
verify-js-production:
	$(MAKE) build-js-production
	@test -d js || (echo "Missing generated js directory" && exit 1)
	@test -s js/client.app.js || (echo "Missing js/client.app.js" && exit 1)
	@test -s js/configuration.app.js || (echo "Missing js/configuration.app.js" && exit 1)
	@test -s js/factureShow.app.js || (echo "Missing js/factureShow.app.js" && exit 1)

watch-js:
	npm run watch

# Linting
lint:
	./node_modules/.bin/eslint ./src/js/*.js --fix

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
	$(MAKE) composer
endif
ifneq (,$(wildcard $(CURDIR)/package.json))
	$(MAKE) npm
endif
ifneq (,$(wildcard $(CURDIR)/js/package.json))
	$(MAKE) npm-js
endif

# Installs PHP dependencies required at runtime.
# Development dependencies are intentionally skipped for deployments.
.PHONY: composer
composer:
	php composer.phar install --prefer-dist --no-dev --optimize-autoloader

# Builds npm dependencies from the root package.json
.PHONY: npm
npm:
	$(npm) run build

# Builds npm dependencies from js/package.json
.PHONY: npm-js
npm-js:
	cd js && $(npm) run build

# Builds the source and appstore package
.PHONY: dist
dist:
	$(MAKE) source
	$(MAKE) appstore

# Builds the source package
.PHONY: source
source:
	rm -rf $(source_build_directory)
	mkdir -p $(source_build_directory)
	tar cvzf $(source_package_name).tar.gz \
	--exclude-vcs \
	--exclude="../$(app_name)/composer.json" \
	--exclude="../$(app_name)/package*" \
	--exclude="../$(app_name)/AGENTS.md" \
	--exclude="../$(app_name)/scripts" \
	--exclude="../$(app_name)/tests" \
	--exclude="../$(app_name)/translationfiles" \
	--exclude="../$(app_name)/src" \
	--exclude="../$(app_name)/build" \
	--exclude="../$(app_name)/js/node_modules" \
	--exclude="../$(app_name)/node_modules" \
	--exclude="../$(app_name)/*.log" \
	--exclude="../$(app_name)/js/*.log" \
	../$(app_name)

# Builds the source package for the app store, ignores php and js tests.
# The appstore package is signed before archiving, as required by Nextcloud.
.PHONY: appstore
appstore: verify-js-production prepare-appstore verify-appstore-template-scripts sign-appstore
	tar cvzf $(appstore_package_name).tar.gz -C $(appstore_build_directory) $(app_name)

.PHONY: prepare-appstore
prepare-appstore:
	rm -rf $(appstore_build_directory)
	mkdir -p $(appstore_build_directory)
	rsync -a \
	--exclude="/.git" \
	--exclude="/.gitignore" \
	--exclude="/.gitattributes" \
	--exclude="/build" \
	--exclude="/dist" \
	--exclude="/AGENTS.md" \
	--exclude="/scripts" \
	--exclude="/tests" \
	--exclude="/translationfiles" \
	--exclude="/Makefile" \
	--exclude="/*.log" \
	--exclude="/phpunit*xml" \
	--exclude="/phpunit*.dist" \
	--exclude="/composer.*" \
	--exclude="/js/node_modules" \
	--exclude="/node_modules" \
	--exclude="/webpack.js" \
	--exclude="/package-lock.json" \
	--exclude="/README.*" \
	--exclude="/js/tests" \
	--exclude="/js/test" \
	--exclude="/js/*.log" \
	--exclude="/js/package.json" \
	--exclude="/js/bower.json" \
	--exclude="/js/karma.*" \
	--exclude="/js/protractor.*" \
	--exclude="/package.json" \
	--exclude="/bower.json" \
	--exclude="/translationtool.phar" \
	--exclude="/karma.*" \
	--exclude="/protractor.*" \
	--exclude="/.*" \
	--exclude="/src" \
	--exclude="/js/.*" \
	--exclude="/drivers" \
	--exclude="/*.sh" \
	./ $(appstore_package_dir)/

.PHONY: verify-template-scripts
verify-template-scripts:
	npm run verify:template-scripts

.PHONY: verify-appstore-template-scripts
verify-appstore-template-scripts:
	npm run verify:template-scripts -- $(appstore_package_dir)

.PHONY: sign-appstore
sign-appstore:
	@test -n "$(APP_PRIVATE_KEY)" || (echo "Missing APP_PRIVATE_KEY=/path/to/private.key" && exit 1)
	@test -n "$(APP_CERTIFICATE)" || (echo "Missing APP_CERTIFICATE=/path/to/certificate.crt" && exit 1)
	@test -f "$(APP_PRIVATE_KEY)" || (echo "Private key not found: $(APP_PRIVATE_KEY)" && exit 1)
	@test -f "$(APP_CERTIFICATE)" || (echo "Certificate not found: $(APP_CERTIFICATE)" && exit 1)
	$(occ) integrity:sign-app --privateKey="$(APP_PRIVATE_KEY)" --certificate="$(APP_CERTIFICATE)" --path="$(appstore_package_dir)"
	@test -f "$(appstore_package_dir)/appinfo/signature.json" || (echo "App signing failed: appinfo/signature.json was not generated" && exit 1)

.PHONY: test
test:
	vendor/bin/phpunit --colors=always --testdox

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
	composer update
	composer install --no-dev --optimize-autoloader --classmap-authoritative

cleanComposer:
	rm -f translationtool.phar composer.lock src/composer.lock
	rm -rf vendor src/vendor

fulltest: runContainer testPanther test stopContainer

runContainer:
	sudo service apache2 stop
	docker run -d --rm --network next --name database -p 3306:3306 -e MYSQL_DATABASE=nextcloud -e MARIADB_ROOT_PASSWORD=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud mariadb
	docker run -d --rm --network next --name nextcloud -p 80:80 nextcloud:27-apache
	sleep 5
	killall geckodriver; php tests/Unit/Panther/initTest.php

loaddata:
	docker exec -i database sh -c 'exec mysql -uroot -p"$$MARIADB_ROOT_PASSWORD"' < ./tests/dataset.sql

stopContainer:
	docker stop -t 0 database
	docker stop -t 0 nextcloud
	sudo service apache2 start

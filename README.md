# Gestion — invoicing app for Nextcloud

[![License AGPL-3.0-or-later](https://img.shields.io/badge/License-AGPL--3.0--or--later-blue.svg)](COPYING)
[![Nextcloud app store](https://img.shields.io/badge/Nextcloud%20App%20Store-Gestion-0082c9.svg)](https://apps.nextcloud.com/apps/gestion)

Gestion is a Nextcloud business management and invoicing application designed for freelancers, micro-enterprises, and small businesses. It helps you manage customers, products, quotes, invoices, and business activity directly from your Nextcloud instance.

> Want to support the project? [Buy the maintainer a coffee](https://www.buymeacoffee.com/benjaminaimard).

## Useful links

| Resource | Link |
| --- | --- |
| Official app | <https://apps.nextcloud.com/apps/gestion> |
| User documentation | <https://baimard.github.io/gestion/> |
| Roadmap | <https://github.com/baimard/gestion/discussions/127> |
| Developer notes | <https://github.com/baimard/gestion/discussions/129> |
| Discussions | <https://github.com/baimard/gestion/discussions> |
| Issues | <https://github.com/baimard/gestion/issues> |

Translations are maintained with help from the Transifex team. Thank you to everyone who contributes to making the application available in multiple languages.

## Features

- Manage customers and their billing details.
- Manage a catalog of products or services.
- Create PDF quotes.
- Create and convert invoices as PDFs.
- Generate Factur-X electronic invoices.
- Send PDFs by email from the application.
- Store generated documents in Nextcloud Files.
- Configure company details, legal notices, VAT, currency, and numbering prefixes.
- Track business activity with statistics screens.
- Share invoicing configurations with other Nextcloud users.

## Compatibility

According to the app metadata, Gestion targets:

- PHP 8 or newer;
- Nextcloud 31 to 34;
- a Nextcloud-compatible database, such as MariaDB/MySQL or PostgreSQL.

The main dependencies are managed with Composer for PHP and npm/Webpack for JavaScript and CSS assets.

## Install from the Nextcloud app store

For a standard installation on an existing instance:

1. Log in to Nextcloud with an administrator account.
2. Open **Apps**.
3. Search for **Gestion**.
4. Install and enable the application.
5. Open the application from the Nextcloud menu and complete your company configuration.

## Manual installation from source

From the `apps` directory of your Nextcloud instance:

```bash
git clone https://github.com/baimard/gestion.git gestion
cd gestion
php composer.phar install --prefer-dist
npm install
npm run build
```

Then enable the app with `occ`:

```bash
php occ app:enable gestion
```

If you run these commands inside the official Nextcloud Docker container, run `occ` as the web server user:

```bash
su -s /bin/bash www-data -c 'php occ app:enable gestion'
```

## Local development deployment with Docker

The following example creates a development Nextcloud instance with MariaDB and mounts the local repository into the Nextcloud apps directory. It is intended for local development only, not for production.

### Requirements

- Docker;
- Docker Compose v2 (`docker compose`);
- Git;
- Node.js 20 and npm 10 if you build assets from the host;
- PHP 8 if you install Composer dependencies from the host.

### 1. Create a `compose.yaml` file

From the repository root, create a temporary `compose.yaml` file:

```yaml
services:
  db:
    image: mariadb:11
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_PASSWORD: nextcloud
      MYSQL_ROOT_PASSWORD: nextcloud
    volumes:
      - db:/var/lib/mysql

  nextcloud:
    image: nextcloud:31-apache
    restart: unless-stopped
    ports:
      - "8080:80"
    depends_on:
      - db
    environment:
      MYSQL_HOST: db
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_PASSWORD: nextcloud
      NEXTCLOUD_ADMIN_USER: admin
      NEXTCLOUD_ADMIN_PASSWORD: admin
    volumes:
      - nextcloud:/var/www/html
      - ./:/var/www/html/apps/gestion

volumes:
  db:
  nextcloud:
```

> The `./:/var/www/html/apps/gestion` volume makes local code changes immediately visible inside the Nextcloud container. The `compose.yaml` file can remain local if you do not want to commit it.

### 2. Start the environment

```bash
docker compose up -d
```

Wait for the automatic installation to finish, then open <http://localhost:8080>. The development credentials used in this example are:

- username: `admin`;
- password: `admin`.

### 3. Install application dependencies

You can install dependencies from the host:

```bash
php composer.phar install --prefer-dist
npm install
npm run build
```

Or from the Nextcloud container:

```bash
docker compose exec nextcloud bash -lc 'cd /var/www/html/apps/gestion && php composer.phar install --prefer-dist'
docker compose exec nextcloud bash -lc 'cd /var/www/html/apps/gestion && apt-get update && apt-get install -y nodejs npm && npm install && npm run build'
```

### 4. Enable the application

```bash
docker compose exec --user www-data nextcloud php occ app:enable gestion
```

If needed, also run Nextcloud repair and migration tasks:

```bash
docker compose exec --user www-data nextcloud php occ maintenance:repair
```

### 5. Watch assets during development

To work on JavaScript/CSS files:

```bash
npm run watch
```

Or, from the container:

```bash
docker compose exec nextcloud bash -lc 'cd /var/www/html/apps/gestion && npm run watch'
```

### 6. Stop and clean up

Stop containers without deleting data:

```bash
docker compose down
```

Also delete development volumes:

```bash
docker compose down -v
```

## Development commands

| Command | Description |
| --- | --- |
| `make dev-setup` | Cleans local artifacts, then installs PHP and npm dependencies. |
| `make build-js` | Builds assets in development mode. |
| `make build-js-production` | Builds assets in production mode. |
| `make watch-js` | Runs Webpack in watch mode. |
| `make lint` | Runs ESLint on JavaScript files in `src/js`. |
| `make test` | Runs the configured PHPUnit test suite. |
| `make testPanther` | Runs Panther UI tests. |
| `make dist` | Prepares source and app store archives. |

## Tests

After installing dependencies:

```bash
vendor/bin/phpunit --colors=always --testdox
```

UI tests may require Firefox, GeckoDriver, and a properly initialized Nextcloud test instance. The `protocole_tests.sh` script documents a historical scenario for starting MariaDB/Nextcloud containers and loading test datasets.

## Repository structure

| Directory / file | Purpose |
| --- | --- |
| `appinfo/` | Nextcloud metadata, routes, and app declarations. |
| `lib/` | Server-side PHP code: controllers, services, migrations, and Nextcloud integration. |
| `src/js/` | JavaScript interface sources. |
| `src/css/` | CSS/LESS sources. |
| `templates/` | PHP templates rendered by Nextcloud. |
| `l10n/` and `translationfiles/` | Application translations. |
| `tests/` | Unit tests, integration tests, datasets, and Panther screenshots. |
| `Makefile` | Build, test, and packaging shortcuts. |

## Contributing

1. Open or pick a GitHub issue.
2. Create a dedicated branch from `master`.
3. Preserve the PHP 8+ and Nextcloud compatibility declared in `appinfo/info.xml`.
4. Install dependencies and run the relevant tests.
5. Submit a pull request that clearly describes the change, tests performed, and any potential impact.

Please avoid editing generated translation files directly when the change should go through Transifex.

## License

Gestion is distributed under the AGPL-3.0-or-later license. See [COPYING](COPYING) for the full license text.

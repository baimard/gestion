<!--
  - SPDX-FileCopyrightText: 2020-2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->
# Changelog

All notable changes to this project will be documented in this file.

## 3.0.3 - 2025-11-07
### Changed
* Update Node and NPM versions ([#896](https://github.com/nextcloud-libraries/nextcloud-logger/pull/896))
  This package now supports being used with Node 22 and Node 24.
* Add SPDX headers ([#683](https://github.com/nextcloud-libraries/nextcloud-logger/pull/683))
* Migrate REUSE to TOML format  ([#696](https://github.com/nextcloud-libraries/nextcloud-logger/pull/696))
* chore(deps): Bump @nextcloud/auth from 2.3.0 to 2.4.0 ([#717](https://github.com/nextcloud-libraries/nextcloud-logger/pull/717))
* chore(deps): Bump rollup from 4.21.0 to 4.22.4 ([#735](https://github.com/nextcloud-libraries/nextcloud-logger/pull/735))
* chore(deps): Bump @nextcloud/auth from 2.4.0 to 2.5.1 ([#863](https://github.com/nextcloud-libraries/nextcloud-logger/pull/863))
* chore: move from `dev:watch` to `watch` ([#859](https://github.com/nextcloud-libraries/nextcloud-logger/pull/859))
* ci: update reuse.yml workflow from template ([#887](https://github.com/nextcloud-libraries/nextcloud-logger/pull/887))
* ci: update npm-publish.yml workflow from template ([#888](https://github.com/nextcloud-libraries/nextcloud-logger/pull/888))
* ci: update dependabot-approve-merge.yml from org ([#724](https://github.com/nextcloud-libraries/nextcloud-logger/pull/724))

## 3.0.2 - 2024-05-16
### Fixed
* fix: Do not leak global declared types into distribution bundle

## 3.0.1 - 2024-04-24
### Fixed
* fix: Drop CoreJS from package.json

### Changed
* chore(deps): Bump @nextcloud/auth from 2.2.1 to 2.3.0
* feat: Migrate to vitest for testing

## 3.0.0 - 2024-04-22
Note: This package is now ESM by default.

### Changed
* chore: Migrate to vite and `@nextcloud/vite-config` to also build an ESM entry point
* fix: Update NPM version to LTS version 10

## 2.7.0 - 2023-09-20
**Full Changelog**: https://github.com/nextcloud-libraries/nextcloud-logger/compare/v2.6.1...v2.7.0

*Note: The packages of the previous releases (2.6.x) were broken.*

### Fixed
* chore: Add missing description to package by @susnux in https://github.com/nextcloud-libraries/nextcloud-logger/pull/557

### Changed
* Updated dependencies

## 2.6.1 - 2023-09-20
**Full Changelog**: https://github.com/nextcloud-libraries/nextcloud-logger/compare/v2.6.0...v2.6.1

### Fixed
* Remove permission check in publish workflows by @artonge in https://github.com/nextcloud-libraries/nextcloud-logger/pull/551

## 2.6.0 - 2023-09-20
**Full Changelog**: https://github.com/nextcloud-libraries/nextcloud-logger/compare/v2.5.0...v2.6.0

### Added
* Allow logging errors when passed as message parameter by @susnux in https://github.com/nextcloud-libraries/nextcloud-logger/pull/444

### Fixed
* Added missing test cases for `LoggerBuilder` and `index` by @susnux in https://github.com/nextcloud-libraries/* Only add required files to npm package by @susnux in https://github.com/nextcloud-libraries/nextcloud-logger/pull/443
* Add typings to published package by @susnux in https://github.com/nextcloud-libraries/nextcloud-logger/pull/442
* Add unit tests workflow by @susnux in https://github.com/nextcloud-libraries/nextcloud-logger/pull/504
* Lint files using ESLint and add CI workflow by @susnux in https://github.com/nextcloud-libraries/nextcloud-logger/pull/505
* fix: Add missing unit tests for `ConsoleLogger` by @susnux in https://github.com/nextcloud-libraries/nextcloud-logger/pull/506
* Use the original property for debug and loglevel by @artonge in https://github.com/nextcloud-libraries/nextcloud-logger/pull/550

### Changed
* chore: update node engines to next LTS by @nextcloud-command in https://github.com/nextcloud-libraries/nextcloud-logger/pull/496
* Updated dependencies


### New Contributors
* @artonge made their first contribution in https://github.com/nextcloud-libraries/nextcloud-logger/pull/550

## 2.5.0 – 2023-01-11
### Changed
- Postpone log level detection until OC loaded
- Dependency updates
### Fixed
- Fix node scripts for building and documentation

## 2.4.0 – 2022-10-24
### Changed
- Dependency updates

## 2.3.0 - 2022-08-25
### Fixed
- Dependency on global OC
### Changed
- Dependency updates

## 2.2.1 - 2022-07-07
### Fixed
- More robust agains library loading order problems
- Work without the `OC` global

## 2.2.0 – 2022-06-27
### Added
- Respect server log level and debug mode settings
### Changed
- Dependency updates

## 2.1.0 – 2021-09-28
### Changed
- Dependency updates

## 2.0.0 – 2021-04-07
### Changed
- Browserslist config updated, which means some older browsers are not supported anymore now
- Dependency updates

## 1.1.2 - 2020-03-19
### Changed
- Dependency updates
### Fixed
- Update vulnerable packages

## 1.1.1 - 2020-01-10
### Fixed
- Bug in @nextcloud/event-bus dependency

## 1.1.0 - 2020-01-08
### Added
- Convenience builder method to detect the UID
### Changed
- Updated documentation

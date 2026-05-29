<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->	
# Changelog

All notable changes to this project will be documented in this file.

## 1.10.0 - 2025-11-07
### Added
* feat: add 30 and 31 ([#276](https://github.com/nextcloud-libraries/nextcloud-typings/pull/276))
* feat: add Nextcloud 32 ([#295](https://github.com/nextcloud-libraries/nextcloud-typings/pull/295))

### Changed
* chore: update Node and NPM version ([#294](https://github.com/nextcloud-libraries/nextcloud-typings/pull/294))
  This package now supports to be used with Node 22 and Node 24.
* chore: add SPDX headers ([#267](https://github.com/nextcloud-libraries/nextcloud-typings/pull/267))
* chore: minor refactoring and cleanup ([#281](https://github.com/nextcloud-libraries/nextcloud-typings/pull/281))
* chore: add and run eslint ([#291](https://github.com/nextcloud-libraries/nextcloud-typings/pull/291))
* chore: replace stub tests with type checking ([#292](https://github.com/nextcloud-libraries/nextcloud-typings/pull/292))
* ci: update actions from template repo ([#269](https://github.com/nextcloud-libraries/nextcloud-typings/pull/269))
* ci: Update dependabot-approve-merge.yml ([#271](https://github.com/nextcloud-libraries/nextcloud-typings/pull/271))
* ci: update workflows from organization ([#280](https://github.com/nextcloud-libraries/nextcloud-typings/pull/280))
* ci: update npm-publish.yml workflow from template ([#290](https://github.com/nextcloud-libraries/nextcloud-typings/pull/290))
* ci: update workflows from organization ([#293](https://github.com/nextcloud-libraries/nextcloud-typings/pull/293))
* docs: fix repo url and add reuse badge ([#268](https://github.com/nextcloud-libraries/nextcloud-typings/pull/268))

## 1.9.1 - 2024-07-04
### Fixed
* fix: Add missing types for `OCP.Files.Router`
* fix: Use Typescript source files for types
* fix: Add missing types for confirmation dialogs

## 1.9.0 - 2024-06-25
### Added
* feat: Add type information for Nextcloud 29

### Fixed
* fix: Do not depend on vue or vue-router for the public interface of `OC.Files.Router`
* fix: Add types for missing `OC` constants

### Changed
* chore(deps-dev): Bump typescript to 5.5.2
* chore(deps-dev): Bump braces 3.0.3

## 1.8.0 - 2024-02-23
### Added
* enh: Add typings for Nextcloud 28
* enh: Provide `@nextcloud/typings/ocs` for `OCSResult` type

### Fixed
* fix: Remove unused travis and renovate config
* fix: Adjust `OCP.Files` types for `Navigation` and `Router`
* fix: Use correct exported name `/ocs` instead of `/types`

### Changes
* chore: update node engines to next LTS (Node 20 + NPM 10)
* Dependency updates

## 1.7.0 - 2023-06-13
### Added
- Added typings for `OC.Util` (all versions)
- Added typings for `OCP.Accessibility` (Nextcloud 25+)
- Added namespace for Nextcloud 26
- Added namespace for Nextcloud 27
  - Including typings for new `OCP.Files.Router` API
### Changed
- Dependency updates

## 1.6.0 - 2023-01-06
### Added
- Added missing `OC.Plugins` for all version
### Fixed
- Fix exporting typings for NC25
### Changed
- Dependency updates

## 1.5.0 – 2022-11-03
### Added
- Nextcloud 25 typings
### Changed
- Dependency updates

## 1.4.3 – 2022-06-14
### Fixed
- Missing `OC.debug` for v17+

## 1.4.2 – 2022-04-29
### Added
- Extract FilePickerFilter type to be available in v24 namespace

## 1.4.1 – 2022-04-27
### Fixed
- Reference Nextcloud 24 typings correctly

## 1.4.0 – 2022-04-26
### Added
- Nextcloud 24 typings
- FileInfo types

## 1.3.0 – 2021-12-07
### Added
- Nextcloud 23 typings

## 1.2.1 - 2021-07-05
### Fixed
- Typings aren't propagated from Nextcloud.Common

## 1.2.0 - 2021-06-29
### Added
- Nextcloud 21 typings
- Nextcloud 22 typings

## 1.0.0 - 2020-08-31
### Added
- Nextcloud 20 typings

## 0.2.4 - 2020-08-31
### Fixed
- Release build

## 0.2.3 - 2020-08-31
### Changed
- Dependency updates

## 0.2.2 - 2020-06-04
### Fixed
- Missing isUserAdmin in v17 and later

## 0.2.1 - 2020-06-03
### Fixed
- Packaging of v0.2.0 files

## 0.2.0 - 2020-06-03
### Changed
- Nextcloud 19 typings added
- Dependency updates

## 0.1.7 - 2020-03-19
### Changed
- Dependency updates
### Fixed
- Update vulnerable packages

## 0.1.6 - 2020-01-08
### Fixed
- Translate option is named 'escape' not 'escaped'

## 0.1.5 - 2020-01-08
### Fixed
- Use of upper case primitive types change to lower case

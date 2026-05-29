<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->

# Changelog

All notable changes to this project will be documented in this file.

## 3.1.0 - 2025-11-13
[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v3.0.1...v3.1.0)

### Added
* feat: add avatar generation URLs ([#757](https://github.com/nextcloud-libraries/nextcloud-router/pull/757))

### Changed
* Add SPDX header ([#642](https://github.com/nextcloud-libraries/nextcloud-router/pull/642))
* Harmonize license ([#673](https://github.com/nextcloud-libraries/nextcloud-router/pull/673))
* chore: move from `dev:watch` back to `watch` ([#769](https://github.com/nextcloud-libraries/nextcloud-router/pull/769))
* chore: update Node and NPM version ([#796](https://github.com/nextcloud-libraries/nextcloud-router/pull/796))
  This package now supports to be used with Node 22 and Node 24.
* build(deps): Bump @nextcloud/typings from 1.8.0 to 1.9.1 ([#637](https://github.com/nextcloud-libraries/nextcloud-router/pull/637))
* ci: update dependabot-approve-merge.yml ([#659](https://github.com/nextcloud-libraries/nextcloud-router/pull/659))
* ci: update workflows form organization ([#614](https://github.com/nextcloud-libraries/nextcloud-router/pull/614))
* ci: update reuse.yml workflow from template ([#789](https://github.com/nextcloud-libraries/nextcloud-router/pull/789))
* ci: update npm-publish.yml workflow from template ([#790](https://github.com/nextcloud-libraries/nextcloud-router/pull/790))
* ci: update workflows from organization ([#797](https://github.com/nextcloud-libraries/nextcloud-router/pull/797))

## 3.0.1 - 2024-04-22
[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v3.0.0...v3.0.1)

### Fixed
* fix: `imagePath` always adds `.svg` if no extension is set on the file name by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/611
* fix: Use files whitelist instead of .npmignore to only include needed files by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/612

### Changed
* fix typo in changelog by @Antreesy in https://github.com/nextcloud-libraries/nextcloud-router/pull/572
* build(deps): Bump @nextcloud/typings from 1.7.0 to 1.8.0

## 3.0.0 - 2024-02-01
[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v2.2.1...v3.0.0)

### Enhancements
* Drop `core-js` and move to vite by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/563
* enh(tests): Add unit tests and CI workflow for testing by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/564
* feat: add method to get a base URL, allow to pass remote base by @Antreesy in https://github.com/nextcloud-libraries/nextcloud-router/pull/558

### Fixed
* fix: Adjust `generateFilePath` to include `type` also for `index.php` by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/566
* fix(getRootUrl)!: If not configured use first subdirectory as webroot instead of last by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/570

### Changed
* Clean up code (drop unreachable code) and minor modernization by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/565
* chore: Add ESLint to project and fix issues reported by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/561
* Make README a bit nicer by adding badges for coverage and documentation by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/569

### Dependencies
* build(deps-dev): Bump vitest from 1.2.1 to 1.2.2 by @dependabot in https://github.com/nextcloud-libraries/nextcloud-router/pull/567
* build(deps-dev): Bump @vitest/coverage-v8 from 1.2.1 to 1.2.2 by @dependabot in https://github.com/nextcloud-libraries/nextcloud-router/pull/568

### New Contributors
* @Antreesy made their first contribution in https://github.com/nextcloud-libraries/nextcloud-router/pull/558


## 2.2.1 - 2024-01-24
[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v2.2.0...v2.2.1)

### Fixed
* fix: Do not rely on `OC.webroots` or `OC.appwebroots` but use own logic by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/560

### Changed
* chore: Update NPM version to 10 to align with version shipped by LTS Node 20 by @susnux in https://github.com/nextcloud-libraries/nextcloud-router/pull/559

## 2.2.0 - 2023-10-18
[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v2.1.2...v2.2.0)

### What's Changed
* chore: update NC typings versions by @skjnldsv in https://github.com/nextcloud-libraries/nextcloud-router/pull/491
* chore: update node engines to next LTS by @nextcloud-command in https://github.com/nextcloud-libraries/nextcloud-router/pull/493
* fix(docs): adjust link to docs by @raimund-schluessler in https://github.com/nextcloud-libraries/nextcloud-router/pull/503

### Dependencies
* build(deps-dev): Bump @babel/cli from 7.22.10 to 7.22.10 by @dependabot
* build(deps-dev): Bump @babel/core from 7.22.10 to 7.23.2 by @dependabot
* build(deps-dev): Bump @babel/preset-env from 7.22.10 to 7.22.10 by @dependabot
* build(deps-dev): Bump @babel/preset-typescript from 7.22.11 to 7.23.2 by @dependabot
* build(deps-dev): Bump @nextcloud/browserslist-config from 2.3.0 to 3.0.0 by @dependabot
* build(deps-dev): Bump typedoc from 0.24.8 to 0.25.2 by @dependabot
* build(deps-dev): Bump typescript from 5.1.3 to 5.2.2 by @dependabot
* build(deps): Bump core-js from 3.30.2 to 8.4.31 by @dependabot

### New Contributors
* @raimund-schluessler made their first contribution in https://github.com/nextcloud-libraries/nextcloud-router/pull/503

## 2.1.2 – 2023-06-13
[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v2.1.1...v2.1.2)

### Fixed
- Do not export the declaration of `window.OC` to prevent typing clashes with applications

## 2.1.1 – 2023-04-21
[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v2.1.0...v2.1.1)

### Fixed
- Moved @nextcloud/typings from dev to production dependency

## 2.1.0 – 2023-04-20

[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v2.0.1...v2.1.0)

### Changed
- Dependency updates

## 2.0.1 - 2022-12-28

[Full Changelog](https://github.com/nextcloud-libraries/nextcloud-router/compare/v2.0.0...v2.0.1)

### Fixed
- fix: fix window variable definition

### Changed
- Add documentation link to Readme
- Add NPM image to readme
- chore: upgrade lockfile to version 2
- Dependency updates
- feat: add node test
- feat: fixup commits check
- fix: fix docs generation

## 2.0.0 - 2021-04-07
### Changed
- generateOcsUrl can now replace routing parameters like generateUrl
- generateOcsUrl no longer contains a trailing slash unless given in the URL
- Browserslist config updated, which means some older browsers are no longer supported
- Dependency updates

## 1.2.0 - 2020-08-20
### Added
- Nextcloud 20 support
### Changed
- Dependency updates

## 1.1.0 - 2020-03-19
### Added
- Typings for Nextcloud 19
### Changed
- Dependency updates
### Fixed
- Loosened version restrictions to allow better npm deduplication

## 1.0.2 - 2020-03-19
### Changed
- Dependency updates
### Fixed
- Update vulnerable packages

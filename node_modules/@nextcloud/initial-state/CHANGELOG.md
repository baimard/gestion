<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->	
# Changelog

All notable changes to this project will be documented in this file.

## 3.0.0 - 2025-08-01
### Breaking
This package now is a pure ES modules package and does no longer provide the CommonJS entry point.

### Added
* feat: cache parsed InitialState results to Map for later use \([\#872](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/872)\)

### Fixed
* fix: return fallback if value cannot be parsed \([\#881](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/881)\)

### Other Changes
* chore!: simplified building process as no bundling is needed \([\#875](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/875)\)
* chore: adjust `engines` versions to support wider range \([\#](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/874)\)
* chore: add SPDX header \([\#708](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/708)\)
* chore: update `package.json` \([\#873](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/873)\)
* chore: migrate to ESLint v9 \([\#879](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/879)\)
* ci: update workflows from organization \([\#876](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/876)\)
* ci: add workflow to check Typescript \([\#878](https://github.com/nextcloud-libraries/nextcloud-initial-state/pull/878)\)

## 2.2.0 - 2024-04-29
### Changed
* Update NPM version to LTS v10
* Migrate to Vite for building and Vitest for testing
* Lint files using ESLint (+ add CI workflow) and move to all Typescript
* Add tests and code coverage badge to README

## 2.1.0 - 2023-07-23
### Fixed
- Set explicit file extensions for package entry files to allow usage with `module` packages \([\#513](https://github.com/nextcloud/nextcloud-initial-state/pull/513)\)
- Fix package exports to support Typescript projects with module resolution of `node16` or `nodenext` \([\#543](https://github.com/nextcloud/nextcloud-initial-state/pull/543)\)

### Changed
- Dependency updates

## 2.0.0 - 2022-08-23

### Changed
- Update dependencies
- Add rollup to build
- Remove babel
  - Typescript already is able to generate code that is in compliance with es5
- Add ESM support
  - Improve native usage support
  - Improve bundle size
- Remove unnecessary files from npm package

## 1.2.1 - 2021-11-02
### Changed
- Dependency updates

## 1.2.0 - 2020-04-06
### Added
- Add optional fallback parameter to loadState method

## 1.1.2 - 2020-04-06
### Changed
- Dependency updates
### Fixed
- Update vulnerable packages

## 1.1.1 - 2020-03-19
### Changed
- Dependency updates
### Fixed
- Update vulnerable packages

## 1.1.0 - 2020-01-08
### Changed
- Updated documentation

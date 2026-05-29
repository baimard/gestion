<!--
  - SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->
# Changelog

All notable changes to this project will be documented in this file.

## 3.1.0 - 2026-02-18
### Added
- feat(normalize): add `normalize` method compatible with the version from `node:path` [\#861](https://github.com/nextcloud-libraries/nextcloud-paths/pull/861)

### Changed
- Updated development dependencies

## 3.0.0 - 2025-12-16
### Breaking changes
- This package now does only provide an ES module, the CJS entry point is removed.
- The behavior of `basename` and `dirname` was fixed to behave similar
  to the methods from the Node.js `paths` module and the PHP methods.
  This mainly affects special cases:
  - trailing slash on `basename` is ignored
  ```diff
  basename('subdir/')
  - ""
  + "subdir"
  ```
  - `dirname` always respects the root path:
  ```diff
  dirname('/')
  - ""
  + "/"
  ```
  ```diff
  dirname('')
  - ""
  + "."
  ```
  ```diff
  dirname('/file')
  - ""
  + "/"
  ```
  ```diff
  dirname('file')
  - ""
  + "."
  ```

### Added
* feat(basename): add support for removing an extension \([#843](https://github.com/nextcloud-libraries/nextcloud-paths/pull/843)\)

### Fixed
* fix!: make `dirname` and `basename` behave like PHP and Node \([#839](https://github.com/nextcloud-libraries/nextcloud-paths/pull/839)\)

### Changed
* chore!: drop commonJs entry points
* chore!: remove deprecated `joinPaths` in favor of `join`
* test: add unit tests for `encodePath`

## 2.4.0 - 2025-11-14
### Added
* feat: add `extname` method
### Changed
* chore: add ESlint so we can enforce consistent code style

## 2.3.0 - 2025-11-12
### Added
* feat: add `join` method that deprecates `joinPaths`

## 2.2.2 - 2025-11-07
### Changed
* Dependency updates
* chore: update Node and NPM versions.
  This package now supports to be used with Node 22 and Node 24.
* ci: update workflows from organization

## 2.2.1 - 2024-07-25
### Fixed
- fix: Correctly setup Typescript root to emit declarations

## 2.2.0 - 2024-07-17
### Fixed
- fix: Adjust package.json to make `build:doc` work again and fix incorrect URL
- fix: Add example of `joinPaths` to README, remove non existing travis

### Changed
- Dependency updates
- Update npm and node engines versions to current LTS
- chore: Migrate to use Vite - drop Babel and Jest
- ci: Update workflows from organization

## 2.1.0 – 2021-09-28
### Changed
- Dependency updates

## 2.0.0 – 2021-04-07
### Changed
- Browserslist config updates, which means some older browsers are no longer supported
- Dependency updates

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

<!--
  - SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->
# Changelog
All notable changes to this project will be documented in this file.

## 2.6.0 - 2026-04-16
### Notes
#### Deprecations
`Axios.CancelToken` is now deprecated, this was deprecated by upstream Axios since 0.22.0.
Please migrate to the native `AbortController` API using the `signal` attribute within the Axios request configuration.

#### Behavior changes
This package now only contains Javascript module (ESM) files, meaning the CommonJS files have been dropped.
All app bundling tools we provide and support (Vite or Webpack 5+) will keep working without any changes needed. For unit tests vitest will keep working as well, for Jest you might need to adjust the `transformIgnorePatterns`.

### Fixed
* fix: fetch token using `@nextcloud/auth` which updates the token on context \([\#913](https://github.com/nextcloud-libraries/nextcloud-axios/pull/913)\)
* fix: axios does not preserve symbols in its config \([\#916](https://github.com/nextcloud-libraries/nextcloud-axios/pull/916)\)

### Changed
* Updated development dependencies
* build(deps): Removed dependency on `@nextcloud/router`
* build(deps): Added dependency on `@nextcloud/auth` 2.6.0+
* build(deps): Bump `axios` to 1.15.0
* ci: update all workflow templates from organization template repository \([\#905](https://github.com/nextcloud-libraries/nextcloud-axios/pull/905)\)
* chore: deprecate `Axios.CancelToken` \([\#918](https://github.com/nextcloud-libraries/nextcloud-axios/pull/918)\)
* chore: drop cjs and migrate building to vanilla Typescript \([\#919](https://github.com/nextcloud-libraries/nextcloud-axios/pull/919)\)

## 2.5.2 - 2025-09-20
### Fixed
* fix: add missing config interface typing for `reloadExpiredSession`

### Changed
* refactor: add SPDX headers
* refactor: migrate REUSE to TOML format
* refactor: resolve Typescript errors and stabilize tests
* chore: migrate to ESLint v9
* chore: allow wider `engine` version range
* chore: adjust `package.json`
  * make order consistent with other libraries
  * update maintainer information
  * fix wrong URLs
* ci: update reuse.yml workflow from organization
* ci: update npm-publish.yml workflow from template
* ci: update workflows from organization
* Bump `@nextcloud/auth` to 2.5.1
* Bump `axios` to 1.12.2

## 2.5.1 - 2024-09-18
### Fixed
* Make license info SPDX compliant: GPL-3.0-or-later

## 2.5.0 - 2024-04-30
### Added
* Export `isAxiosError` and Axios types - So in most cases you do not need to also depend on vanilla Axios

### Fixed
* fix: Set X-Requested-With header on all requests to avoid browser auth dialogs

### Changed
* Update NPM to v10 for LTS Node version 20
* Bump axios from 1.5.0 to 1.6.8
* Bump @nextcloud/router from 2.1.2 to 3.0.1
* Bump @nextcloud/auth from 2.1.0 to 2.3.0
* Migrate to vite and vitest
* Adjust badges and links in README

## 2.4.0 – 2023-06-28
### Fixed
- Fix package exports to allow Typescript projects with module
  resolution of `Node16` or `NodeNext` to import the package

### Changed
- Axios upgrade from v0.27 to v1.4
- Update node engines to next LTS (node 20 / npm 9) 
- Dependency updates

## 2.3.0 – 2022-12-13
### Changed
- Dependency updates
### Fixed
- Cancelled request handling in interceptors
- External rollup dependency @nextcloud/router

## 2.2.0 – 2022-11-24
### Added
- Session expiry handler (opt-in)
### Changed
- Dependency updates

## 2.1.0 - 2022-10-01
### Added
- Maintenance mode retry handler
- Expired CSRF token retry handler
### Changed
- Dependency updates

## 2.0.0 - 2022-08-11
### Added
- Use rollup as bundler
- Add ESM Support
- Run tests in more Node versions
### Changed
- Remove babel

## 1.11.0 – 2022-08-10
### Changed
- Require Node 16 with NPM 7 or NPM 8
- Dependency updates

## 1.10.0 – 2022-04-27
### Changed
- Dependency updates
- Remove babel as production dependency
- Set `@nextcloud/auth` as dependency

## 1.9.0 – 2022-01-18
### Changed
- Dependency updates (esp. axios v0.25.0)
### Fixed
- Update vulnerable packages (follow-redirects v1.14.7 via axios v0.25.0)

## 1.8.0 – 2021-11-26
### Changed
- Dependency updates (esp. axios v0.24.0)

## 1.7.0 – 2021-09-28
### Changed
- Dependency updates

## 1.6.0 - 2021-01-05
### Changed
- Dependency updates (esp. axios v0.21.1)

## 1.5.0 - 2020-10-27
### Changed
- Dependency updates (esp. axios v0.21.0)

## 1.4.0 - 2020-08-31
### Changed
- Dependency updates (esp. axios v0.20.0)
### Fixed
- Update vulnerable packages

## 1.3.3 - 2020-06-08
### Changed
- Dependency updates
### Fixed
- Update vulnerable packages

## 1.3.2 - 2020-03-19
### Changed
- Dependency updates
### Fixed
- Update vulnerable packages

## 1.3.1 - 2020-01-10
### Changed
- Fixed bug in @nextcloud/event-bus

## 1.2.0 - 2020-01-07
### Changed
- Updated dependencies

## 0.5
### Added
- Cancellation support via axios.CancelToken
### Changed
- Updated browserslist config

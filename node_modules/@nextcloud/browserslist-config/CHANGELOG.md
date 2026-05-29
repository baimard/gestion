<!--
  - SPDX-FileCopyrightText: Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->

# Changelog

All notable changes to this project will be documented in this file.

## 3.1.2 - 2025-11-07
### Fixed
* fix: adjust config to support only active or used browsers

### Changed
* chore: update node versions
  This package now supports to be used with Node 22 and Node 24.
* chore: rename internally browserlist to browserslist
* chore: use consistent note about contributing and authors
* chore: manually lint
* test: use node test runner for testing
* docs: add changelog to keep track of changes

## 3.1.1 - 2025-10-20
### Fixed
- fix: add minimal supported `browserslist` version to peer dependencies

## 3.1.0 - 2025-10-17
### Changed
- Update browserlist configuration for compatibility
  - The supported browsers list has been widened to support all
    non dead browsers supporting the current browsers baseline.
- Add SPDX header
- ci: update reuse.yml workflow from template
- ci: update npm-publish.yml workflow from template

## 3.0.1 - 2024-04-23
### Changed
- Update NPM version to latest LTS version 10 for Node 20
- chore: update workflows from templates

## 3.0.0 - 2023-08-16
### Breaking
- Removed IE 11 since it's already dead

### Changed
- We now supports node `^20.0.0` and npm `^9.0.0`

## 2.3.0 - 2022-08-07
### Changed
- We now supports node `^16.0.0` and npm `^7.0.0 || ^8.0.0`

## 2.1.0 - 2021-03-24
### Added
- Added Firefox ESR

## 2.0.0 - 2021-03-24
### Breaking
- ⚠️ Dropped support for IE
- ⚠️ Dropped support for opera mini

### Added
- Moved from last 2 versions to >0.25%

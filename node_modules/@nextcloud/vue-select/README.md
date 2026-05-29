<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: MIT
-->

# @nextcloud/vue-select

[![npm last version](https://img.shields.io/npm/v/@nextcloud/vue-select.svg?style=flat-square)](https://www.npmjs.com/package/@nextcloud/vue-select)
[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/vue-select)](https://api.reuse.software/info/github.com/nextcloud-libraries/vue-select)
[![MIT License](https://img.shields.io/github/license/nextcloud-libraries/vue-select?style=flat-square)](https://github.com/nextcloud-libraries/vue-select/blob/main/LICENSE.md)

Lightweight, accessible select/dropdown/typeahead component for Vue 3.

This package was originally forked from [vue-select](https://github.com/sagalbot/vue-select) to implement accessibility improvements and is actively maintained by Nextcloud.

- Tagging
- Filtering / Searching
- AJAX Support
- SSR Support
- Accessible
- Select Single/Multiple Options
- Customizable with slots and CSS variables
- Zero dependencies

## Documentation

For props, slots, and events refer to the upstream [vue-select documentation](https://vue-select.org).
Note that this fork may diverge — CSS theming uses custom properties instead of SCSS.

## Compatibility

| Version | Vue  |
|---------|------|
| 4.x     | ^3.0 |
| 3.x     | ^2.6 |

## Install

```bash
npm i @nextcloud/vue-select
```

## Usage

Import and register the component:

```js
import { VueSelect } from '@nextcloud/vue-select'
```

CSS is included automatically via the JS import. All styling is done via CSS custom properties (`--vs-*`), making it easy to theme without a preprocessor.

## Contributing

1. Check or create an issue and discuss the change
2. Fork the repository and create a new branch
3. Make your changes and add tests where possible
4. Follow [Conventional Commits](https://www.conventionalcommits.org) for commit messages
5. Submit a pull request

Please read the [Code of Conduct](https://nextcloud.com/community/code-of-conduct/).

## License

[MIT](https://github.com/nextcloud-libraries/vue-select/blob/main/LICENSE.md)

<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->	
# @nextcloud/typings
[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/nextcloud-typings)](https://api.reuse.software/info/github.com/nextcloud-libraries/nextcloud-typings)
[![NPM package](https://img.shields.io/npm/v/@nextcloud/typings)](https://www.npmjs.com/package/@nextcloud/typings)
[![License](https://img.shields.io/npm/l/@nextcloud/typings?color=blue)](https://github.com/nextcloud/nextcloud-typings/blob/master/LICENSE)
[![Open issues](https://img.shields.io/github/issues-raw/nextcloud/nextcloud-typings)](https://github.com/nextcloud/nextcloud-typings/issues)

Versioned typings for the (internal) JavaScript APIs of Nextcloud used in higher level packages.

## Installation

```sh
npm i -S @nextcloud/typings
```

The typings have to be in the ``dependencies`` section, not ``devDependencies``. See https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html#dependencies for details.

## Usage

You can use this package to verify your API usage is compatible with a range of Nextcloud versions

```ts
/// <reference types="@nextcloud/typings" />

declare var OC: Nextcloud.v26.OC | Nextcloud.v27.OC | Nextcloud.v28.OC;

OC.L10N.translate("app", "text")
```

The TypeScript compiler will translate the code above to `OC.L10N.translate("app", "text");` and throws an error if any of the Nextcloud versions in use for the [union type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types) do not exist on all interfaces.

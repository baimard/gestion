<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->
# @nextcloud/auth

[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/nextcloud-auth)](https://api.reuse.software/info/github.com/nextcloud-libraries/nextcloud-auth)
[![npm](https://img.shields.io/npm/v/@nextcloud/auth.svg)](https://www.npmjs.com/package/@nextcloud/auth)
[![Documentation](https://img.shields.io/badge/Documentation-online-brightgreen)](https://nextcloud-libraries.github.io/nextcloud-auth/index.html)

Nextcloud helpers related to authentication and the current user

## Install

```sh
npm install @nextcloud/auth --save
```

```sh
yarn add @nextcloud/auth
```

## Usage
For detailed information check [the package documentation](https://nextcloud-libraries.github.io/nextcloud-auth/index.html).

One example usage to get the current user:
```ts
import { getCurrentUser } from '@nextcloud/auth'

const user = getCurrentUser()

if (user.isAdmin) {
  // do something
}
```

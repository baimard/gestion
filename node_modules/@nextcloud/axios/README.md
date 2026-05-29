<!--
  - SPDX-FileCopyrightText: 2018-2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->
# @nextcloud/axios
[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/nextcloud-axios)](https://api.reuse.software/info/github.com/nextcloud-libraries/nextcloud-axios)
[![Build Status](https://img.shields.io/github/actions/workflow/status/nextcloud-libraries/nextcloud-axios/node-test.yml?branch=master)](https://github.com/nextcloud-libraries/nextcloud-axios/actions/workflows/node-test.yml?query=branch%3Amaster)
[![npm](https://img.shields.io/npm/v/@nextcloud/axios.svg)](https://www.npmjs.com/package/@nextcloud/axios)
[![code coverage](https://img.shields.io/codecov/c/github/nextcloud-libraries/nextcloud-axios)](https://app.codecov.io/gh/nextcloud-libraries/nextcloud-axios)


Simple, typed wrapper of an Axios instance for Nextcloud that automatically sends authentication headers. [Cancellation](https://github.com/axios/axios#cancellation) is supported as well.

## Installation

```sh
npm install @nextcloud/axios --save
```

```sh
yarn add @nextcloud/axios
```

## Usage

```js
import axios from '@nextcloud/axios'

axios.get('nextcloud.com')
```

See https://github.com/axios/axios for details.

### Defining `baseURL`

You are able to define [`baseURL`](https://axios-http.com/docs/config_defaults) to simplify the usage of axios across your app.

```ts
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

const baseURL = generateUrl('/apps/your_app_id/api')

axios.defaults.baseURL = baseURL
```

### Retry handling

This package can optionally retry requests if they fail due to Nextcloud's *maintenance mode*. To activate this feature, pass
`retryIfMaintenanceMode: true` into the request options. This mechanism will only catch relatively short server maintenance
downtime in the range of seconds to a minute. Any longer downtime still has to be handled by the application, show feedback
to the user, reload the page etc.

```js
import axios from '@nextcloud/axios'

const pizzas = await axios.get('/apps/pizza/api/pizzas', {
    retryIfMaintenanceMode: true,
})
const myPizza = await axios.post('/apps/pizza/api/pizzas', { toppings: ['pineapple'] }, {
    retryIfMaintenanceMode: true,
})
```

### Expired sessions handling

This package can optionally trigger a page reload whenever a request fails due to an expired user session. This interrupts
application logic and should be the last resort. If possible, handle the expired session higher up in the application.

```js
import axios from '@nextcloud/axios'

const response = await axios.get('/apps/foo/api/bar', {
    reloadExpiredSession: true,
})
```

References

- [@nextcloud/router](https://github.com/nextcloud/nextcloud-router)
- [Nextcloud App Routing](https://docs.nextcloud.com/server/latest/developer_manual/basics/routing.html)

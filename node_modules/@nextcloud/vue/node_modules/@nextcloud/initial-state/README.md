# @nextcloud/initial-state

[![npm](https://img.shields.io/npm/v/@nextcloud/initial-state.svg)](https://www.npmjs.com/package/@nextcloud/initial-state)
[![Test status](https://img.shields.io/github/actions/workflow/status/nextcloud-libraries/nextcloud-initial-state/node-test.yml?label=tests)](https://github.com/nextcloud-libraries/nextcloud-initial-state/actions/workflows/node-test.yml?query=branch%3Amaster)
[![Code coverage](https://img.shields.io/codecov/c/gh/nextcloud-libraries/nextcloud-initial-state/master)](https://app.codecov.io/gh/nextcloud-libraries/nextcloud-initial-state)
[![Documentation](https://img.shields.io/badge/Documentation-online-brightgreen)](https://nextcloud.github.io/nextcloud-initial-state/)

Access data from the server-side initial state API within apps.

## Installation

```sh
npm install @nextcloud/initial-state --save
```

```sh
yarn add @nextcloud/initial-state
```

## Usage

> Check ["Providing the initial state with PHP"](https://docs.nextcloud.com/server/latest/developer_manual/basics/front-end/js.html#providing-the-initial-state-with-php) for more details about initial state.

> Note: `loadState` throws an `Error` if the key isn't found, hence you might want to wrap the call with a `try` block.

```js
import { loadState } from '@nextcloud/initial-state'

const val = loadState('myapp', 'user_preference')

// Provide a fallback value to return when the state is not found
const valWithFallback = loadState('myapp', 'user_preference', 'no_preference')
```

You can provide a type anotation for result.

```ts
import { loadState } from '@nextcloud/initial-state'

interface UserPreference {
  refreshInterval: number
}

const val = loadState<UserPreference>('myapp', 'user_preference', {
  refreshInterval: 15_000
})
```

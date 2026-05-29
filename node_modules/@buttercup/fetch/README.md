# Fetch
> Fetch adapter for cross-platform use.

[![Buttercup](https://cdn.rawgit.com/buttercup-pw/buttercup-assets/6582a033/badge/buttercup-slim.svg)](https://buttercup.pw) [![npm (scoped)](https://img.shields.io/npm/v/@buttercup/fetch)](https://www.npmjs.com/package/@buttercup/fetch) ![Tests](https://github.com/buttercup/fetch/actions/workflows/test.yml/badge.svg)

## About

This library exports `fetch` in various environments, such as within a browser or under NodeJS:

 * Browsers get the native `window.fetch`
 * NodeJS gets `node-fetch`

_This library was designed to be used primarily within Buttercup and its supporting libraries: Features and fixes implemented here will be oriented to furthering Buttercup's goals, and unnessarily changes may be rejected due to that._

## Installation

For browser use you need only install this library:

```shell
npm install @buttercup/fetch --save-dev
```

For NodeJS use you must also install `node-fetch`:

```shell
npm install @buttercup/fetch node-fetch --save
```

## Usage

You can import the various components related to fetch regardless of the entry your application uses:

```typescript
import {
    fetch,
    Headers,
    Request,
    Response
} from "@buttercup/fetch";

// ...

const res = await fetch("https://...");
```

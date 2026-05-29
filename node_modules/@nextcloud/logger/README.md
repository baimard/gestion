<!--
  - SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: GPL-3.0-or-later
-->
# @nextcloud/logger

[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/nextcloud-logger)](https://api.reuse.software/info/github.com/nextcloud-libraries/nextcloud-logger) [![Build Status](https://img.shields.io/github/actions/workflow/status/nextcloud-libraries/nextcloud-logger/node.yml?branch=master)](https://github.com/nextcloud-libraries/nextcloud-logger/actions/workflows/node.yml) [![Code coverage](https://img.shields.io/codecov/c/gh/nextcloud-libraries/nextcloud-logger/master)](https://app.codecov.io/gh/nextcloud-libraries/nextcloud-logger) [![npm](https://img.shields.io/npm/v/@nextcloud/logger.svg)](https://www.npmjs.com/package/@nextcloud/logger)
[![Documentation](https://img.shields.io/badge/Documentation-online-brightgreen)](https://nextcloud.github.io/nextcloud-logger/)

Generic JavaScript logging interface for Nextcloud apps and libraries

## Usage
See also [API documentation](https://nextcloud-libraries.github.io/nextcloud-logger/).

```js
import { getLoggerBuilder } from '@nextcloud/logger'

const logger = getLoggerBuilder()
    .setApp('mail')
    .detectUser()
    .build()

logger.debug('hello')
logger.error('this should not have happened', { someContext: 13 })
logger.warn('it\'s just a warning, carry on')
```

Right now the package uses `window.console` as log appender and produces the following output

```
[DEBUG] mail: hello { app: 'mail', uid: 'christoph' }
[ERROR] mail: this should not have happened { app: 'mail', uid: 'christoph', someContext: 13 }
[WARN] mail: it's just a warning, carry on { app: 'mail', uid: 'christoph' }
```

The logger tries to detect the server configured logging level by default,
which can be configured using the `loglevel_frontend` option in the `config.php`.
In case no logging level was configured or detection failed, the logger will fallback to the *warning* level.

If the server is set to the debug mode the configured logging level will be set to the *debug* level.

Any message with a lower level than the configured will not be printed on the console.

You can override the logging level in both cases by setting it manually using the `setLogLevel` function
when building the logger.

## Contributing

This repository is maintained using [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/).

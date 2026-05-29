<!--
  - SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
# @nextcloud/files
[![npm last version](https://img.shields.io/npm/v/@nextcloud/files.svg?style=flat-square)](https://www.npmjs.com/package/@nextcloud/files) [![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/nextcloud-files)](https://api.reuse.software/info/github.com/nextcloud-libraries/nextcloud-files) [![Code coverage](https://img.shields.io/codecov/c/github/nextcloud-libraries/nextcloud-files?style=flat-square)](https://app.codecov.io/gh/nextcloud-libraries/nextcloud-files) [![Project documentation](https://img.shields.io/badge/documentation-online-blue?style=flat-square)](https://nextcloud-libraries.github.io/nextcloud-files/)

Nextcloud Files helpers for Nextcloud apps and libraries.

This library provides three kinds of utils:
1. WebDAV helper functions to work with the Nextcloud WebDAV interface.
   Those functions are available in `@nextcloud/files/dav`
2. Geneal purpose function related to files or folders, like filename validation.
3. Functions and classes to interact with the Nextcloud **files** app, like registering a new view or a file action.

## Usage examples

### Files app

#### Register a "New"-menu entry

The "New"-menu allows to create new entries or upload files, it is also possible for other apps to register their own actions here.

```ts
import type { Entry } from '@nextcloud/files'
import { addNewFileMenuEntry } from '@nextcloud/files'
import { t } from '@nextcloud/l10n'

const myEntry: Entry = {
	// unique ID of the entry
	id: 'my-app',
	// The display name in the menu
	displayName: t('my-app', 'New something'),
	// optionally pass an SVG (string) to be used as the menu entry icon
	iconSvgInline: importedSVGFile,
	handler(context: Folder, content: Node[]): void {
		// `context` is the current active folder
		// `content` is the content of the currently active folder
		// You can add new files here e.g. use the WebDAV functions to create files.
		// If new content is added, ensure to emit the event-bus signals so the files app can update the list.
	}
}

addNewFileMenuEntry(myEntry)
```

### WebDAV
The `getClient` exported function returns a webDAV client that's a wrapper around [webdav's webDAV client](https://www.npmjs.com/package/webdav).
All its methods are available here.

#### Using WebDAV to query favorite nodes

```ts
import { getClient, defaultRootPath, getFavoriteNodes } from '@nextcloud/files/dav'

const client = getClient()
// query favorites for the root folder (meaning all favorites)
const favorites = await getFavoriteNodes(client)
// which is the same as writing:
const favorites = await getFavoriteNodes(client, '/', defaultRootPath)
```

#### Using WebDAV to list all nodes in directory

```ts
import {
    getClient,
    getDefaultPropfind,
    resultToNode,
    defaultRootPath,
    defaultRemoteURL
} from '@nextcloud/files/dav'

// Get the DAV client for the default remote
const client = getClient()
// which is the same as writing
const client = getClient(defaultRemoteURL)
// of cause you can also configure another WebDAV remote
const client = getClient('https://example.com/dav')

const path = '/my-folder/' // the directory you want to list

// Query the directory content using the webdav library
// `davRootPath` is the files root, for Nextcloud this is '/files/USERID', by default the current user is used
const results = client.getDirectoryContents(`${defaultRootPath}${path}`, {
    details: true,
    // Query all required properties for a Node
    data: getDefaultPropfind()
})

// Convert the result to an array of Node
const nodes = results.data.map((result) => resultToNode(r))
// If you specified a different root in the `getDirectoryContents` you must add this also on the `resultToNode` call:
const nodes = results.data.map((result) => resultToNode(r, myRoot))
// Same if you used a different remote URL:
const nodes = results.data.map((result) => resultToNode(r, myRoot, myRemoteURL))

```

#### Using WebDAV to get a Node from a file's name

```ts
	import { getClient, davGetDefaultPropfind, resultToNode, davRootPath } from '@nextcloud/files'
	import { emit } from '@nextcloud/event-bus'
	const client = getClient()
	client.stat(`${davRootPath}${filename}`, {
		details: true,
		data: davGetDefaultPropfind(),
	}).then((result) => {
		const node = resultToNode(result.data)
		emit('files:node:updated', node)
	})
```

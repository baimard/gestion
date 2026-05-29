/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import { createLibConfig } from '@nextcloud/vite-config'
import { join } from 'node:path'

export default createLibConfig({
	index: join(__dirname, 'lib/index.ts'),
}, {
	libraryFormats: ['cjs', 'es'],
})

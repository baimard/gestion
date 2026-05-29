/*
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'happy-dom',
	},
})

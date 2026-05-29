/*
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { beforeEach, describe, expect, it } from 'vitest'
import { clearAll } from '../lib/index.ts'
import ScopedStorage from '../lib/ScopedStorage.ts'

describe('clearAll', () => {
	/** @type {Storage} */
	let wrapped

	/** @type {ScopedStorage} */
	let persistent

	/** @type {ScopedStorage} */
	let volatile

	beforeEach(() => {
		wrapped = window.localStorage
		persistent = new ScopedStorage('test', wrapped, true)
		volatile = new ScopedStorage('test', wrapped, false)
	})

	it('clears only volatile storages', () => {
		persistent.setItem('i1', 'hello')
		volatile.setItem('i2', 'world')

		clearAll()

		expect(persistent.getItem('i1')).toBeNull()
		expect(volatile.getItem('i2')).toBeNull()
	})
})

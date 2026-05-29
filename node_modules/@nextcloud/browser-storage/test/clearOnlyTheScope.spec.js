/*
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { beforeEach, describe, expect, it } from 'vitest'
import ScopedStorage from '../lib/ScopedStorage.ts'

describe('clearNonPersistent', () => {
	/** @type {Storage} */
	let wrapped

	/** @type {ScopedStorage} */
	let storage1

	/** @type {ScopedStorage} */
	let storage2

	beforeEach(() => {
		wrapped = window.localStorage
		storage1 = new ScopedStorage('files', wrapped, false)
		storage2 = new ScopedStorage('files_pdfviewer', wrapped, false)
	})

	it('clears only volatile storages', () => {
		storage1.setItem('i1', 'hello')
		storage2.setItem('i2', 'world')

		storage1.clear()

		expect(storage1.getItem('i1')).toBeNull()
		expect(storage2.getItem('i2')).not.toBeNull()
	})
})

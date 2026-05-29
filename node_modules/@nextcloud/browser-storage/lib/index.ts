/*
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import ScopedStorage from './ScopedStorage.ts'
import StorageBuilder from './StorageBuilder.ts'

/**
 * Get the storage builder for an app
 *
 * @param appId App ID to scope storage
 */
export function getBuilder(appId: string): StorageBuilder {
	return new StorageBuilder(appId)
}

/**
 * Clear values from storage
 *
 * @param storage The storage to clear
 * @param pred Callback to check if value should be cleared
 */
function clearStorage(storage: Storage, pred?: (value: string) => boolean): void {
	Object.keys(storage)
		.filter((k) => pred ? pred(k) : true)
		.map(storage.removeItem.bind(storage))
}

/**
 * Clear all values from all storages
 */
export function clearAll(): void {
	const storages = [
		window.sessionStorage,
		window.localStorage,
	]
	storages.map((s) => clearStorage(s))
}

/**
 * Clear ony non persistent values
 */
export function clearNonPersistent(): void {
	const storages = [
		window.sessionStorage,
		window.localStorage,
	]
	storages.map((s) => clearStorage(s, (k) => !k.startsWith(ScopedStorage.GLOBAL_SCOPE_PERSISTENT)))
}

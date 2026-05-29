/*
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type NextcloudStorage from './Storage.ts'

export default class ScopedStorage implements NextcloudStorage {
	public static GLOBAL_SCOPE_VOLATILE = 'nextcloud_vol'
	public static GLOBAL_SCOPE_PERSISTENT = 'nextcloud_per'
	private scope: string
	private wrapped: Storage

	constructor(scope: string, wrapped: Storage, persistent: boolean) {
		this.scope = `${persistent ? ScopedStorage.GLOBAL_SCOPE_PERSISTENT : ScopedStorage.GLOBAL_SCOPE_VOLATILE}_${btoa(scope)}_`
		this.wrapped = wrapped
	}

	private scopeKey(key: string) {
		return `${this.scope}${key}`
	}

	setItem(key: string, value: string): void {
		this.wrapped.setItem(this.scopeKey(key), value)
	}

	getItem(key: string): string | null {
		return this.wrapped.getItem(this.scopeKey(key))
	}

	removeItem(key: string): void {
		this.wrapped.removeItem(this.scopeKey(key))
	}

	clear(): void {
		Object.keys(this.wrapped)
			.filter((key) => key.startsWith(this.scope))
			.map(this.wrapped.removeItem.bind(this.wrapped))
	}
}

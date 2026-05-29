/*
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export default interface Storage {
	setItem(key: string, value: string): void
	getItem(key: string): string | null
	removeItem(key: string): void
	clear(): void
}

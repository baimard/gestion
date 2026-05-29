/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
export interface OCSResponse<T = any> {
	ocs: {
		meta: {
			/**
			 * Request success or failure state
			 */
			status: 'ok' | 'failure'

			/**
			 * Status code defaults to 100, but often HTTP status codes are used
			 */
			statuscode: number

			/**
			 * Message text
			 */
			message: string | undefined

			/**
			 * Optionally the total number of items available
			 */
			totalitems: number | undefined
			/**
			 * Optionally the the number of items per page
			 */
			itemsperpage: number | undefined
		}
		data: T
	}
}

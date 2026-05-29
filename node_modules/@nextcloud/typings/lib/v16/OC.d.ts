/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

/// <reference types="jquery" />
/// <reference path="../common/OC.d.ts" />

declare namespace Nextcloud.v16 {

	interface OC extends Nextcloud.Common.OC {
		coreApps: string[]
		menuSpeed: number
		TAG_FAVORITE: string

		PERMISSION_NONE: 0
		PERMISSION_READ: 1
		PERMISSION_UPDATE: 2
		PERMISSION_CREATE: 4
		PERMISSION_DELETE: 8
		PERMISSION_SHARE: 16
		PERMISSION_ALL: 31
	}

	interface OCP extends Nextcloud.Common.OCP {

	}

	interface humanFileSize extends Nextcloud.Common.humanFileSize {

	}

	interface WindowWithGlobals extends Nextcloud.Common.DayMonthConstants, Window {

	}

}

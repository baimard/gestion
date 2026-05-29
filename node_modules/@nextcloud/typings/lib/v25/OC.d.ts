/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
declare namespace Nextcloud.v25 {

	interface Accessibility {
		/** Whether the user opted-out of shortcuts so that they should not be registered */
		disableKeyboardShortcuts(): boolean
	}

	interface OC extends Nextcloud.v24.OC {

	}

	interface OCP extends Nextcloud.v24.OCP {
		Accessibility: Accessibility
	}

	interface WindowWithGlobals extends Nextcloud.Common.DayMonthConstants, Window {

	}
}

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
/// <reference types="jquery" />

declare namespace Nextcloud.v18 {

	interface OC extends Nextcloud.v17.OC {

	}

	interface OCP extends Nextcloud.Common.OCP {

	}

	interface humanFileSize extends Nextcloud.Common.humanFileSize {

	}

	interface WindowWithGlobals extends Nextcloud.Common.DayMonthConstants, Window {

	}

}

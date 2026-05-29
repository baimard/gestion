/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
/// <reference types="jquery" />

declare namespace Nextcloud.v19 {

	interface Files extends Nextcloud.Common.Files {
		FileInfo: FileInfo
	}

	interface FileInfo extends Nextcloud.Common.FileInfo {
		quotaAvailableBytes: number
	}

	interface OC extends Nextcloud.v18.OC {
		Files: Files
	}

	interface OCP extends Nextcloud.v18.OCP {

	}

	interface WindowWithGlobals extends Nextcloud.Common.DayMonthConstants, Window {

	}

}

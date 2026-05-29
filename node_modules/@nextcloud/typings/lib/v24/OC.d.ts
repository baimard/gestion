/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
declare namespace Nextcloud.v24 {

	type FilePickerFilter = (entry: Nextcloud.v19.FileInfo) => boolean

	interface FilePickerOptions extends Nextcloud.v17.FilePickerOptions {
		filter: FilePickerFilter
	}

	type OC = Omit<Nextcloud.v23.OC, 'Util'> & {
		dialogs: {
			filepicker(
				title: string,
				callback: Function,
				multiselect?: boolean,
				mimeTypeFilter?: Array<string>,
				modal?: boolean,
				type?: number,
				path?: string,
				options?: FilePickerOptions,
			): void
		}

		// OC.Util.isIE was dropped
		Util: Omit<Nextcloud.v23.OC['Util'], 'isIE'>
	}

	interface OCP extends Nextcloud.v23.OCP {

	}

	interface WindowWithGlobals extends Nextcloud.Common.DayMonthConstants, Window {

	}
}

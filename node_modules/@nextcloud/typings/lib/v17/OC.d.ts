/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
declare namespace Nextcloud.v17 {

	interface FilePickerOptions {
		allowDirectoryChooser: boolean
	}

	interface Dialogs extends Omit<Nextcloud.v16.OC['dialogs'], 'filepicker'> {
		// options parameter was added
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

	interface OC extends Nextcloud.v16.OC {
		appswebroots: any
		config: any
		coreApps: any

		debug: boolean

		requestToken: string

		getCurrentUser(): Nextcloud.Common.CurrentUser
		isUserAdmin(): boolean

		getRootPath(): string
		linkTo(app: string, file: string): string
		linkToRemoteBase(service: string): string
		linkToRemote(service: string): string
		linkToOCS(service: string, version: number): string

		generateUrl(url: string, params?: object, options?: Nextcloud.Common.UrlOptions): string
		filePath(app: string, type: string, file: string): string
		imagePath(app: string, file: string): string
		encodePath(path: string): string

		getLocale(): string
		getLanguage(): string
		getCanonicalLocale(): string

		dialogs: Dialogs
		L10N: Nextcloud.Common.L10n
		Notifications: Nextcloud.Common.Notifications

		webroot: string
	}

	interface OCP extends Nextcloud.Common.OCP {

	}

	interface humanFileSize extends Nextcloud.Common.humanFileSize {

	}

	interface WindowWithGlobals extends Nextcloud.Common.DayMonthConstants, Window {

	}

}

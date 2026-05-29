/// <reference types="jquery" />
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
declare namespace Nextcloud.Common {

	type Nullable<T> = null | T

	interface CurrentUser {
		uid: string | false
		displayName: string | null
	}

	interface UrlOptions {
		escape: boolean
	}

	interface Dialogs {
		FILEPICKER_TYPE_CHOOSE: number
		FILEPICKER_TYPE_MOVE: number
		FILEPICKER_TYPE_COPY: number
		FILEPICKER_TYPE_COPY_MOVE: number

		readonly YES_NO_BUTTONS: number
		readonly OK_BUTTONS: number

		filepicker(
			title: string,
			callback: Function,
			multiselect?: boolean,
			mimeTypeFilter?: Array<string>,
			modal?: boolean,
			type?: number,
			path?: string,
		): void

		/**
		 * Displays confirmation dialog
		 *
		 * @param text content of dialog
		 * @param title dialog title
		 * @param callback which will be triggered when user presses OK (true or false would be passed to callback respectively)
		 * @param modal make the dialog modal
		 */
		confirm(
			text: string,
			title: string,
			callback: (answer: boolean) => void,
			modal?: boolean,
		): Promise<void>

		/**
		 * Displays confirmation dialog
		 *
		 * @param text content of dialog
		 * @param title dialog title
		 * @param buttons text content of buttons
		 * @param callback which will be triggered when user presses OK (true or false would be passed to callback respectively)
		 * @param modal make the dialog modal
		 */
		confirmDestructive(
			text: string,
			title: string,
			buttons: number | { type: number, confirm: string, cancel: string, confirmClasses: string },
			callback: (answer: boolean) => void,
			modal?: boolean,
		): Promise<void>
	}

	interface TranslationOptions {
		escape?: boolean
	}
	interface L10n {
		translate(app: string, text: string, vars?: object, count?: number, options?: TranslationOptions): string
		translatePlural(app: string, textSingular: string, textPlural: string, count: number, vars?: object, options?: TranslationOptions): string
	}

	interface NotificationOptions {
		isHtml?: boolean
		timeout?: number
		type?: string
	}
	interface Notifications {
		show(text: string, options?: NotificationOptions): JQuery
		showTemporary(text: string, options?: NotificationOptions): JQuery
	}

	interface PasswordConfirmationOptions {
		title?: string
		text?: string
		confirm?: string
		label?: string
		error?: string
	}
	interface PasswordConfirmation {
		requiresPasswordConfirmation(): boolean
		requirePasswordConfirmation(callback?: () => void, options?: PasswordConfirmationOptions, rejectCallback?: () => void): void
	}

	interface Files {
		FileInfo: FileInfo
	}

	enum Permission {
		None = 0,
		Create = 4,
		Read = 1,
		Update = 2,
		Delete = 8,
		Share = 16,
		All = 31,
	}

	interface Plugin {
		name: string
		attach?(targetObject: any, options?: Record<string, any>): void
		detach?(targetObject: any, options?: Record<string, any>): void
	}

	interface Plugins {
		/**
		 * Register plugin
		 *
		 * @param targetName app name / class name to hook into
		 * @param plugin plugin
		 */
		register(targetName: string, plugin: Plugin): void

		/**
		 * Returns all plugin registered to the given target
		 * name / app name / class name.
		 *
		 * @param targetName app name / class name to hook into
		 * @return array of plugins
		 */
		getPlugins(targetName: string): Array<Plugin>

		/**
		 * Call attach() on all plugins registered to the given target name.
		 *
		 * @param targetName app name / class name
		 * @param targetObject to be extended
		 * @param options
		 */
		attach(targetName: string, targetObject: any, options?: Record<string, any>): void

		/**
		 * Call detach() on all plugins registered to the given target name.
		 *
		 * @param targetName app name / class name
		 * @param targetObject to be extended
		 * @param options
		 */
		detach(targetName: string, targetObject: any, options?: Record<string, any>): void
	}

	interface FileInfo {
		id: Nullable<number>
		name: Nullable<string>
		/**
		 * Absolute path of the containing directory
		 */
		path: Nullable<string>
		mimetype: Nullable<string>
		/**
		 * URL which overrides the mime type icon
		 */
		icon: Nullable<string>
		permissions: Nullable<Permission>
		mtime: Nullable<number>
		etag: Nullable<string>
		mountType: Nullable<'external-root' | 'shared' | 'shared-root'>
		hasPreview: boolean
		sharePermissions: Nullable<Permission>
	}

	interface UtilHistory {
		/**
		 * Push the current URL parameters to the history stack
		 * and change the visible URL.
		 *
		 * @param params to append to the URL
		 * @param url URL to be used, otherwise the current URL will be used, using the params as query string
		 */
		pushState(params: Record<string, string> | string, url?: string): void

		/**
		 * Replace the current URL parameters on the history stack
		 * and change the visible URL.
		 *
		 * @param params to append to the URL
		 * @param url URL to be used
		 */
		replaceState(params: Record<string, string> | string, url: string): void

		/**
		 * Add a popstate handler
		 *
		 * @param handler The handler
		 */
		addOnPopStateHandler(handler: Function): void

		/**
		 * Parse the query/search part of the URL.
		 *
		 * @return map of parameters
		 */
		parseUrlQuery(): Record<string, string>

	}
	interface Util {
		History: UtilHistory

		/**
		 * Make a human file size (2048 to 2 kB)
		 *
		 * @param size File size in bytes
		 * @return A human readable file size
		 */
		humanFileSize(size: number, skipSmallSizes: boolean): string

		/**
		 * Returns a file size in bytes from a humanly readable string
		 * Like 2kB to 2048.
		 *
		 * @param  string file size in human readable format
		 * @return Number of bytes or Null if string could not be parsed
		 */
		computerFileSize(string: string): null | number

		formatDate(timestamp: string, format: string): string

		/**
		 * Human readable difference from now
		 */
		relativeModifiedDate(timestamp: string): string

		/**
		 * Returns whether this is IE
		 */
		isIE(): boolean

		/**
		 * Returns the width of a generic browser scrollbar
		 *
		 * @return width of scrollbar
		 */
		getScrollBarWidth(): number

		/**
		 * Remove the time component from a given date
		 *
		 * @param date Given date
		 * @return Date with stripped time
		 */
		stripTime(date: Date): Date

		/**
		 * Compare two strings to provide a natural sort
		 *
		 * @param a first string to compare
		 * @param b second string to compare
		 * @return negative if b comes before a, positive if a comes before b
		 * or 0 if the strings are identical
		 */
		naturalSortCompare(a: string, b: string): number

		/**
		 * Calls the callback in a given interval until it returns true
		 *
		 * @param callback The callback function
		 * @param interval in milliseconds
		 */
		waitFor(callback: Function, interval: number): void

		/**
		 * Checks if a cookie with the given name is present and is set to the provided value.
		 *
		 * @param name name of the cookie
		 * @param value value of the cookie
		 * @return true if the cookie with the given name has the given value
		 */
		isCookieSetToValue(name: string, value: string): boolean
	}

	interface OC {
		appswebroots: any
		config: any
		coreApps: any

		requestToken: string

		getCurrentUser(): CurrentUser
		isUserAdmin(): boolean

		getRootPath(): string
		linkTo(app: string, file: string): string
		linkToRemoteBase(service: string): string
		linkToRemote(service: string): string
		linkToOCS(service: string, version: number): string

		generateUrl(url: string, params?: object, options?: UrlOptions): string
		filePath(app: string, type: string, file: string): string
		imagePath(app: string, file: string): string
		encodePath(path: string): string

		getLocale(): string
		getLanguage(): string
		getCanonicalLocale(): string

		dialogs: Dialogs
		L10N: L10n
		Files: Files
		Notifications: Notifications
		PasswordConfirmation: PasswordConfirmation
		Plugins: Plugins
		Util: Util

		webroot: string
	}

	interface InitialState {
		loadState<T>(appId: string, key: string): T
	}

	interface OCP {
		InitialState: InitialState
	}

	// global scope until v18
	type humanFileSize = Util['humanFileSize']

	interface DayMonthConstants {
		firstDay: number
		dayNames: string[]
		dayNamesShort: string[]
		dayNamesMin: string[]
		monthNames: string[]
		monthNamesShort: string[]
	}
}

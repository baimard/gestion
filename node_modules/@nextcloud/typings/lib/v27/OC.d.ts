/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
declare namespace Nextcloud.v27 {
	type Dictionary<T> = { [index: string]: T }

	interface Vue2RouteMeta extends Record<string | number | symbol, any> {}

	interface Vue2Route {
		path: string
		name?: string | null
		hash: string
		query: Dictionary<string | (string | null)[]>
		params: Dictionary<string>
		fullPath: string
		matched: any[]
		redirectedFrom?: string
		meta?: Vue2RouteMeta
	}

	interface FilesRouter {
		/**
		 * Trigger a route change on the files app
		 *
		 * @param path the url path, eg: '/trashbin?dir=/Deleted'
		 * @param replace replace the current history (default false)
		 * @see https://v3.router.vuejs.org/guide/essentials/navigation.html
		 */
		goTo(path: string, replace?: boolean): Promise<Vue2Route>

		/**
		 * Trigger a route change on the files App
		 *
		 * @param name the route name
		 * @param params the route parameters
		 * @param query the url query parameters
		 * @param replace replace the current history
		 * @see https://v3.router.vuejs.org/guide/essentials/navigation.html
		 */
		goToRoute(
			name?: string | null,
			params?: Record<string, string>,
			query?: Record<string, string | (string | null)[] | null | undefined>,
			replace?: boolean,
		): Promise<Vue2Route>
	}

	interface OC extends Nextcloud.v26.OC {

	}

	interface OCP extends Omit<Nextcloud.v26.OCP, 'Files'> {
		Files: {
			Router: FilesRouter
		}
	}

	interface WindowWithGlobals extends Nextcloud.Common.DayMonthConstants, Window {

	}
}

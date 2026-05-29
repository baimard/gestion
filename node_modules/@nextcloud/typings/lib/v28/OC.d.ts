/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
declare namespace Nextcloud.v28 {

	interface ContentsWithRoot {
		/**
		 * `@nextcloud/files` Folder
		 */
		folder: Record<string, any>
		/**
		 * `@nextcloud/files` Node[]
		 */
		contents: Record<string, any>[]
	}

	interface FilesNavigationColumn {
		/** Unique column ID */
		id: string

		/** Translated column title */
		title: string

		/**
		 * The content of the cell. The element will be appended within
		 * `node` parameter is of type `@nextcloud/files` Node
		 */
		render: (node: Record<string, any>, view: FilesNavigationView) => HTMLElement

		/**
		 * Function used to sort Nodes between them
		 * Parameters are of type `@nextcloud/files` Node
		 */
		sort?: (nodeA: Record<string, any>, nodeB: Record<string, any>) => number
		/**
		 * Custom summary of the column to display at the end of the list.
		 * Will not be displayed if  nothing is provided
		 * `node` parameter is of type `@nextcloud/files` Node
		 */
		summary?: (node: Record<string, any>[], view: FilesNavigationView) => string
	}

	interface FilesNavigationView<Column = FilesNavigationColumn> {
		/** Unique view ID */
		id: string
		/** Translated view name */
		name: string
		/** The view icon as an inline svg */
		icon: string
		/** The view order */
		order: number
		/** This view column(s). Name and actions are by default always included */
		columns?: Column[]
		/** The empty view element to render your empty content into */
		emptyView?: (div: HTMLDivElement) => void
		/** The parent unique ID */
		parent?: string
		/** This view is sticky (sent at the bottom) */
		sticky?: boolean
		/** This view has children and is expanded or not */
		expanded?: boolean

		/** Translated accessible description of the view */
		caption?: string

		/** Translated title of the empty view */
		emptyTitle?: string
		/** Translated description of the empty view */
		emptyCaption?: string

		/**
		 * Method return the content of the  provided path
		 * This ideally should be a cancellable promise.
		 * promise.cancel(reason) will be called when the directory
		 * change and the promise is not resolved yet.
		 * You _must_ also return the current directory
		 * information alongside with its content.
		 */
		getContents: (path: string) => Promise<ContentsWithRoot>

		/**
		 * Custom params to give to the router on click
		 * If defined, will be treated as a dummy view and
		 * will just redirect and not fetch any contents.
		 */
		params?: Record<string, string>

		/**
		 * Will be used as default if the user
		 * haven't customized their sorting column
		 */
		defaultSortKey?: string
	}

	interface FilesNavigation<View = FilesNavigationView> {
		/**
		 * Register a new navigation view
		 */
		register: (view: View) => void

		/**
		 * Remove a registered view
		 */
		remove: (id: string) => void

		/**
		 * Set the currently active view
		 */
		setActive: (view: View | null) => void

		/**
		 * Current active view
		 */
		active: View | null

		/**
		 * All registered views
		 */
		views: View[]
	}

	interface FilesRouter extends Nextcloud.v27.FilesRouter {
		/**
		 * Name of the current route
		 */
		readonly name: string | null | undefined
		/**
		 * Query options of the current route
		 */
		readonly query: Nextcloud.v27.Dictionary<string | (string | null)[] | null | undefined>
		/**
		 * Params of the current route
		 */
		readonly params: Nextcloud.v27.Dictionary<string>
	}

	interface OC extends Omit<Nextcloud.v27.OC, 'appSettings' | 'addScript' | 'addStyle'> {
		/**
		 * 'appSettings', 'addScript', and 'addStyle' were removed in Nextcloud 28
		 */
	}

	interface OCP extends Omit<Nextcloud.v27.OCP, 'Files'> {
		Files: {
			Router: FilesRouter
			Navigation: FilesNavigation
		}
	}

	interface WindowWithGlobals extends Nextcloud.v27.WindowWithGlobals {

	}
}

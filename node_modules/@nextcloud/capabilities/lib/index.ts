/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import { loadState } from '@nextcloud/initial-state'

export function getCapabilities(): Object {
	try {
		return loadState('core', 'capabilities')
	} catch (error) {
		console.debug('Could not find capabilities initial state fall back to _oc_capabilities')
		if (!('_oc_capabilities' in window)) {
			return {}
		}
		return window['_oc_capabilities'] as Object
	}
}

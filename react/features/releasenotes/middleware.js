// @flow

import { MiddlewareRegistry } from '../base/redux';

import { OPEN_RELEASE_NOTES_DIALOG } from './actionTypes';

declare var APP: Object;

/**
 * Implements the middleware of the feature keyboard-shortcuts.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 */
// eslint-disable-next-line no-unused-vars
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case OPEN_RELEASE_NOTES_DIALOG:
        if (typeof APP === 'object') {
            APP.releasenotes.openDialog();
        }
        break;
    }

    return next(action);
});

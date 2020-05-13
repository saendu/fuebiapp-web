import { OPEN_RELEASE_NOTES_DIALOG } from './actionTypes';

/**
 * Opens the dialog showing available keyboard shortcuts.
 *
 * @returns {{
 *     type: OPEN_RELEASE_NOTES_DIALOG
 * }}
 */
export function openKeyboardShortcutsDialog() {
    return {
        type: OPEN_RELEASE_NOTES_DIALOG
    };
}

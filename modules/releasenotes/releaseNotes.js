/* global APP, $, interfaceConfig */

import { toggleDialog } from '../../react/features/base/dialog';
import { ReleaseNotesDialog } from '../../react/features/releasenotes';
import jitsiLocalStorage from '../util/JitsiLocalStorage';
import { APP_RELEASE_VERSION_CACHE_KEY } from './constants';

/**
 * Map of shortcuts. When a shortcut is registered it enters the mapping.
 * @type {Map}
 */

const ReleaseNotes = {
    
    releaseNotes: new Map(),
    
    init() {
        this.releaseNotes.set('Poke', {
            name: 'Poke to drink',
            icon: 'plusone',
            translateKeyPart: 'releaseNotes.plusone',
            description: 'Hover over the beer icon of a participant and click the beer+1 icon'
        });

        this.releaseNotes.set('NewRound', {
            name: 'New round',
            icon: 'nextround',
            translateKeyPart: 'releaseNotes.nextround',
            description: 'Click on the white cheering beer icon to initiate a new round'
        });

        this.releaseNotes.set('Shots', {
            name: 'Shots round',
            icon: 'shots',
            translateKeyPart: 'releaseNotes.shots',
            description: 'Click on the shots icon to show all others that you want shots'
        });

        this.releaseNotes.set('Beer', {
            name: 'Open new beer',
            icon: 'beer',
            translateKeyPart: 'releaseNotes.poke',
            description: 'Click on the white beer icon to increase your own beer count'
        });
    },

    /**
     * Opens the {@ReleaseNotesDialog} dialog.
     *
     * @returns {void}
     */
    openDialog() {
        // Check if dialog should be shown
        if(jitsiLocalStorage.getItem(`Fuebiapp:doNotShowReleaseNotes:${APP_RELEASE_VERSION_CACHE_KEY}`) === "true") return; 

        APP.store.dispatch(toggleDialog(ReleaseNotesDialog, {
            releaseNotes: this.releaseNotes
        }));
    },

};

export default ReleaseNotes;

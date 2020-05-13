/* @flow */

import Lozenge from '@atlaskit/lozenge';
import React, { Component } from 'react';

import { Dialog } from '../../base/dialog';
import { hideDialog } from '../../base/dialog/actions';
import { translate } from '../../base/i18n';
import { IconShots, IconBeerWhite, IconBeerPlusOne, IconNextRound } from '../../base/icons';
import jitsiLocalStorage from '../../../../modules/util/JitsiLocalStorage';
import { APP_RELEASE_VERSION, APP_RELEASE_VERSION_CACHE_KEY } from '../../../../modules/releasenotes/constants';

/**
 * The type of the React {@code Component} props of
 * {@link ReleaseNotesDialog}.
 */
type Props = {

    releaseNotes: Object,

    t: Function
};

/**
 * Implements a React {@link Component} which displays a dialog describing
 * registered keyboard shortcuts.
 *
 * @extends Component
 */
class ReleaseNotesDialog extends Component<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const releaseNotes = Array.from(this.props.releaseNotes)
            .map((i, index) => this._renderItem(index, ...i));
        
        return (
            <div>
                <Dialog
                    cancelKey = { 'dialog.close' }
                    submitDisabled = { true }
                    titleKey = {`Release notes ${APP_RELEASE_VERSION}`}
                    width = 'small'
                    onCancel = { this._onClickCancel.bind(this) }
                 >
                    <div
                        id = 'keyboard-shortcuts'>
                        <ul
                            className = 'shortcuts-list'
                            id = 'keyboard-shortcuts-list'>
                            { releaseNotes }
                        </ul>
                    </div>
                </Dialog>
                
            </div>
        );
    }

    _onClickCancel() {
        // set session storage 
        jitsiLocalStorage.setItem(`Fuebiapp:doNotShowReleaseNotes:${APP_RELEASE_VERSION_CACHE_KEY}`, true);
        
        APP.store.dispatch(hideDialog())
    }

    /**
     * Creates a {@code ReactElement} for describing a single keyboard shortcut.
     *
     * @param {string} keyboardKey - The keyboard key that triggers an action.
     * @param {string} translationKey - A description of what the action does.
     * @private
     * @returns {ReactElement}
     */
    _renderItem(index, key, value) {
        let Icon = () => null; 
            switch (value.icon) {
                case 'plusone':
                    Icon = () => <IconBeerPlusOne
                        size = '2em'
                        height = { '24' }
                        width = { '24' } 
                    />
                    break;

                case 'nextround':
                    Icon = () => <IconNextRound
                        size = '2em'
                        height = { '24' }
                        width = { '24' } 
                    />
                    break;
                case 'shots':
                    Icon = () => <IconShots
                        size = '2em'
                        height = { '24' }
                        width = { '24' } 
                        style = {{fill: 'white'}}
                    />
                    break;
            
                default:
                    Icon = () => <IconBeerWhite
                        size = '2em'
                        height = { '24' }
                        width = { '24' } 
                    />
                    break;
            }
        return (
            <li
                className = 'shortcuts-list__item'
                key = { index }>
                <span>
                    <Icon />
                </span>
                <span className = 'item-action'>
                    <Lozenge isBold = { true }>
                        { this.props.t(`${value.translateKeyPart}.name`) }
                    </Lozenge>
                </span>
                <span className = 'shortcuts-list__description'>
                    { this.props.t(`${value.translateKeyPart}.description`) }
                </span>
            </li>
        );
    }
}

export default translate(ReleaseNotesDialog);

/* @flow */

import React from 'react';

import { translate } from '../../../base/i18n';
import { IconMicDisabled } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { IconPoke } from '../../../base/icons';

import AbstractPokeButton, {
    _mapStateToProps,
    type Props
} from '../AbstractPokeButton';

import RemoteVideoMenuButton from './RemoteVideoMenuButton';

class PokeButton extends AbstractPokeButton {
    constructor(props: Props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
        this.state = {
            buttonLocked: false
        }
    }
    
    render() {
        const { participantID } = this.props;
        const { buttonLocked } = this.state; 
        const pokeConfig = buttonLocked ? {
            translationKey: 'videothumbnail.muted',
            muteClassName: 'pokelink disabled'
        } : {
            translationKey: 'videothumbnail.domute',
            muteClassName: 'pokelink'
        };
        
        return (
            <RemoteVideoMenuButton
                buttonText = 'Poke everyone to drink!'
                displayClass = {pokeConfig.muteClassName}
                icon = { IconPoke }
                id = { `pokelink_${participantID}` }
                // eslint-disable-next-line react/jsx-handler-names
                onClick = { !buttonLocked ? this._handleClick : null} />
        );
    }

    _handleClick: () => void

    _handleClick() {
        super._handleClick();
        
        this.setState({
            buttonLocked: true
        });

        const { clickTimeout } = this.props;
        // enable Button after 3 seconds 
        setTimeout(() => this.setState({
                buttonLocked: false
            })
        , clickTimeout);
    }
}

export default translate(connect(_mapStateToProps)(PokeButton));

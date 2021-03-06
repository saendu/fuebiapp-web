// @flow

import React, { Component } from 'react';

import { NumberIcon, IconBeer, IconBeerWhite, IconBeerPlusOne } from '../../../base/icons';
import { getLocalParticipant, getParticipantById, PARTICIPANT_ROLE } from '../../../base/participants';
import { Popover } from '../../../base/popover';
import { connect } from '../../../base/redux';

import {
    BeerTimer,
    MuteButton,
    MuteEveryoneElseButton,
    KickButton,
    PokeButton,
    PrivateMessageMenuButton,
    RemoteControlButton,
    RemoteVideoMenu,
    VolumeSlider
} from './';

declare var $: Object;
declare var interfaceConfig: Object;

/**
 * The type of the React {@code Component} props of
 * {@link RemoteBeerIndicator}.
 */
type Props = {

    /**
     * Whether or not to display the kick button.
     */
    _disableKick: boolean,

    /**
     * Whether or not to display the remote mute buttons.
     */
    _disableRemoteMute: Boolean,

    /**
     * Whether or not the participant is a conference moderator.
     */
    _isModerator: boolean,

    /* BEER COUNT */
    _beerCount: number,

    /* BEER TIMESTAMP */
    _beerTimeStamp: number,

    _isNewRoundPending: Boolean, 

    /**
     * A value between 0 and 1 indicating the volume of the participant's
     * audio element.
     */
    initialVolumeValue: number,

    /**
     * Whether or not the participant is currently muted.
     */
    isAudioMuted: boolean,

    /**
     * Callback to invoke when the popover has been displayed.
     */
    onMenuDisplay: Function,

    /**
     * Callback to invoke choosing to start a remote control session with
     * the participant.
     */
    onRemoteControlToggle: Function,

    /**
     * Callback to invoke when changing the level of the participant's
     * audio element.
     */
    onVolumeChange: Function,

    /**
     * The position relative to the trigger the remote menu should display
     * from. Valid values are those supported by AtlasKit
     * {@code InlineDialog}.
     */
    menuPosition: string,

    /**
     * The ID for the participant on which the remote video menu will act.
     */
    participantID: string,

    /**
     * The current state of the participant's remote control session.
     */
    remoteControlState: number,

    hoverDisabled: boolean
};

/**
 * React {@code Component} for displaying an icon associated with opening the
 * the {@code RemoteVideoMenu}.
 *
 * @extends {Component}
 */
class BeerPopover extends Component<Props, *> {
    /**
     * The internal reference to topmost DOM/HTML element backing the React
     * {@code Component}. Accessed directly for associating an element as
     * the trigger for a popover.
     *
     * @private
     * @type {HTMLDivElement}
     */
    _rootElement = null;
    _intervalId = null; 

    /**
     * Initializes a new {#@code RemoteBeerIndicator} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Object) {
        super(props);

        this.state = {
            beerIconVisible: true
        }
        // Bind event handler so it is only bound once for every instance.
        this._onShowRemoteMenu = this._onShowRemoteMenu.bind(this);
    }
    
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _isNewRoundPending, hoverDisabled } = this.props; 
        const content = this._renderRemoteVideoMenu(); 
        if (!content) {
            return null;
        }

        if(_isNewRoundPending && !this._intervalId) this._blinkTimer();
        if(!_isNewRoundPending && this._intervalId) this._intervalId = clearInterval(this._intervalId);
        const iconBlinkStyle = _isNewRoundPending ? { visibility: this.state.beerIconVisible ? 'visible' : 'hidden' } : { visibility: 'visible' };

        return (
            hoverDisabled ? 
            <div
                className = 'popover-trigger remote-video-menu-trigger beerPopover'>
                <NumberIcon
                    size = '2em'
                    src = { _isNewRoundPending ? IconBeerPlusOne : IconBeer  }
                    title = 'Beer stats' 
                    number = {this.props._beerCount} />
                <BeerTimer
                    beerCount = {this.props._beerCount}
                    beerTimeStamp = {this.props._beerTimeStamp}
                />
            </div> :
            <Popover
            content = { content }
            onPopoverOpen = { this._onShowRemoteMenu }
            position = { this.props.menuPosition }>
                <div
                    className = 'popover-trigger remote-video-menu-trigger beerPopover'>
                    <NumberIcon
                        size = '2em'
                        src = { _isNewRoundPending ? IconBeerPlusOne : IconBeer }
                        title = 'Beer stats' 
                        number = {this.props._beerCount}
                        style = { iconBlinkStyle }
                    />
                    <BeerTimer
                        beerCount = {this.props._beerCount}
                        beerTimeStamp = {this.props._beerTimeStamp}
                    />
                </div>
            </Popover>
        );
    }

    _blinkTimer () {
        const blinkToggle = () => {
            this.setState(prevState => {
                return {
                    beerIconVisible: !prevState.beerIconVisible
                };
            });
        }
		
        
		this._intervalId = setInterval(() => {
            blinkToggle(); 
        }, 530);
	}

    _onShowRemoteMenu: () => void;

    /**
     * Opens the {@code RemoteVideoMenu}.
     *
     * @private
     * @returns {void}
     */
    _onShowRemoteMenu() {
        this.props.onMenuDisplay();
    }

    /**
     * Creates a new {@code RemoteVideoMenu} with buttons for interacting with
     * the remote participant.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderRemoteVideoMenu() {
        const {
            _disableKick,
            _disableRemoteMute,
            _isModerator,
            initialVolumeValue,
            isAudioMuted,
            onRemoteControlToggle,
            onVolumeChange,
            remoteControlState,
            participantID
        } = this.props;

        const buttons = [];
        
        buttons.push(
            <PokeButton
                key = 'poke'
                participantID = { participantID }
                clickTimeout = { '5000' }

            />
        );

        if (_isModerator) {
            if (!_disableRemoteMute) {
                buttons.push(
                    <MuteButton
                        isAudioMuted = { isAudioMuted }
                        key = 'mute'
                        participantID = { participantID } />
                );
                buttons.push(
                    <MuteEveryoneElseButton
                        key = 'mute-others'
                        participantID = { participantID } />
                );
            }

            if (!_disableKick) {
                buttons.push(
                    <KickButton
                        key = 'kick'
                        participantID = { participantID } />
                );
            }
        }
        

        if (remoteControlState) {
            buttons.push(
                <RemoteControlButton
                    key = 'remote-control'
                    onClick = { onRemoteControlToggle }
                    participantID = { participantID }
                    remoteControlState = { remoteControlState } />
            );
        }

        buttons.push(
            <PrivateMessageMenuButton
                key = 'privateMessage'
                participantID = { participantID } />
        );

        if (onVolumeChange) {
            buttons.push(
                <VolumeSlider
                    initialValue = { initialVolumeValue }
                    key = 'volume-slider'
                    onChange = { onVolumeChange } />
            );
        }

        if (buttons.length > 0) {
            return (
                <RemoteVideoMenu id = { participantID }>
                    { buttons }
                </RemoteVideoMenu>
            );
        }

        return null;
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code RemoteBeerIndicator}'s props.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The own props of the component.
 * @private
 * @returns {{
 *     _isModerator: boolean
 * }}
 */
function _mapStateToProps(state, ownProps) {
    const participants = state["features/base/participants"]; 
    const participantFilterFn = ownProps.participantID === 'local' ? 
        (p) => p.local : (p) => p.id === ownProps.participantID;
    const ownParticipant = participants.filter(participantFilterFn)[0];

    const { remoteVideoMenu = {}, disableRemoteMute } = state['features/base/config'];
    const { disableKick } = remoteVideoMenu;

    return {
        _isModerator: Boolean((ownParticipant?.role) === PARTICIPANT_ROLE.MODERATOR),
        _disableKick: Boolean(disableKick),
        _disableRemoteMute: Boolean(disableRemoteMute),
        _beerCount: ownParticipant ? Math.round(ownParticipant.beerCount) : 0, // fix back hack to force update
        _beerTimeStamp: ownParticipant ? ownParticipant.beerTimeStamp : null,
        _isNewRoundPending: ownParticipant ? ownParticipant.newRoundPending : false
    };
}

export default connect(_mapStateToProps)(BeerPopover);

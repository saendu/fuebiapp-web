// @flow

import { Component } from 'react';

import { getWantsShotsParticipant, getParticipantDisplayName } from '../../base/participants';

export type Props = {

    /**
     * The participant participantName who we want to render the raised hand indicator
     * for.
     */
    _shotsEnforcerName: string,

    /**
     * True if the hand is raised for this participant.
     */
    _someoneWantsShots?: boolean
}

/**
 * Implements an abstract class for the RaisedHandIndicator component.
 */
export default class AbstractShotsWarning<P: Props>
    extends Component<P> {

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        if (!this.props._someoneWantsShots) {
            return null;
        }

        return this._renderIndicator();
    }

    /**
     * Renders the platform specific indicator element.
     *
     * @returns {React$Element<*>}
     */
    _renderIndicator: () => React$Element<*>

}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Props} ownProps - The own props of the component.
 * @returns {Object}
 */
export function _mapStateToProps(state: Object, ownProps: Props): Object {
    const wantsShotsParticipant = getWantsShotsParticipant(state);
    let displayName = ""; 
    if(wantsShotsParticipant) {
        displayName = getParticipantDisplayName(state, wantsShotsParticipant.id);
    }
    

    return {
        _someoneWantsShots: wantsShotsParticipant ? true : false,
        _shotsEnforcerName: displayName
    };
}

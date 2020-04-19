/* @flow */

import React from 'react';

import { translate } from '../../../base/i18n';
import { IconMicDisabled } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { IconBeer } from '../../../base/icons';
import { Icon } from '../../../base/icons';

import AbstractBeerCounter, {
    _mapStateToProps,
    type Props
} from '../AbstractBeerCounter';

import RemoteVideoMenuButton from './RemoteVideoMenuButton';

/**
 * Implements a React {@link Component} which displays a button for audio muting
 * a participant in the conference.
 *
 * NOTE: At the time of writing this is a button that doesn't use the
 * {@code AbstractButton} base component, but is inherited from the same
 * super class ({@code AbstractBeerCounter} that extends {@code AbstractButton})
 * for the sake of code sharing between web and mobile. Once web uses the
 * {@code AbstractButton} base component, this can be fully removed.
 */
class BeerCounter extends AbstractBeerCounter {
    /**
     * Instantiates a new {@code Component}.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { beerTimer, participantID, t } = this.props;
        const linkClassName = `popupmenu__link`;
        
        // TODO: style and use count from state
        const beerCount = 6;
        const timerSeconds = Math.round(beerTimer.read(0)/1000); 
        
        const text = `Beer timer: ${timerSeconds}`;

        return (
            <li className = 'popupmenu__item'>
                <span className = 'popupmenu__icon'>
                    <Icon src = { IconBeer } />
                </span>
                <span className = 'popupmenu__text'>
                    { text }
                </span>
            </li>
        );
    }

    _handleClick: () => void
}

export default translate(connect(_mapStateToProps)(BeerCounter));

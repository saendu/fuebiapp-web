/* @flow */

import React from 'react';

import { IconShots } from '../../../base/icons';
import { BaseIndicator } from '../../../base/react';
import { connect } from '../../../base/redux';

import AbstractShotsIndicator, {
    type Props as AbstractProps,
    _mapStateToProps
} from '../AbstractShotsIndicator';

/**
 * The type of the React {@code Component} props of {@link ShotsIndicator}.
 */
type Props = AbstractProps & {

    /**
     * The font-size for the icon.
     */
    iconSize: number,

    /**
     * From which side of the indicator the tooltip should appear from.
     */
    tooltipPosition: string
};

/**
 * Thumbnail badge showing that the participant would like to speak.
 *
 * @extends Component
 */
class ShotsIndicator extends AbstractShotsIndicator<Props> {
    /**
     * Renders the platform specific indicator element.
     *
     * @returns {React$Element<*>}
     */
    _renderIndicator() {
        return (
            <BaseIndicator
                className = 'raisehandindicator indicator show-inline shots'
                icon = { IconShots }
                iconClassName = 'indicatoricon'
                iconSize = { `${this.props.iconSize}px` }
                tooltipKey = 'shots'
                tooltipPosition = { this.props.tooltipPosition } />
        );
    }
}

export default connect(_mapStateToProps)(ShotsIndicator);

/* @flow */

import React from 'react';

import Banner from '@atlaskit/banner';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { connect } from '../../../base/redux';

import AbstractDrinkWarning, {
    type Props as AbstractProps,
    _mapStateToProps
} from '../AbstractDrinkWarning';

/**
 * The type of the React {@code Component} props of {@link DrinkWarning}.
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
class DrinkWarning extends AbstractDrinkWarning<Props> {
    /**
     * Renders the platform specific indicator element.
     *
     * @returns {React$Element<*>}
     */
    
    _renderIndicator() {
        // TODO SF: Translate
        const Icon = <WarningIcon label="Warning icon" secondaryColor="inherit" />;
        return (
            <div>
                <Banner icon={Icon} isOpen={true} appearance="error">
                    {this.props._drinkEnforcerName} wants everyone to take SHOTS!
                </Banner>
                <div className="shots-clip"><img src="images/shots.gif"/></div>
            </div>
        );
    }
}

export default connect(_mapStateToProps)(DrinkWarning);

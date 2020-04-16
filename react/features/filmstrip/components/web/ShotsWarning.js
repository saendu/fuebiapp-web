/* @flow */

import React from 'react';

import Banner from '@atlaskit/banner';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { connect } from '../../../base/redux';

import AbstractShotsWarning, {
    type Props as AbstractProps,
    _mapStateToProps
} from '../AbstractShotsWarning';

/**
 * The type of the React {@code Component} props of {@link ShotsWarning}.
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
class ShotsWarning extends AbstractShotsWarning<Props> {
    /**
     * Renders the platform specific indicator element.
     *
     * @returns {React$Element<*>}
     */
    
    _renderIndicator() {
        const Icon = <WarningIcon label="Warning icon" secondaryColor="inherit" />;
        const WarningBanner = ({ isOpen = true }) => (
            <div>
                <Banner icon={Icon} isOpen={isOpen} appearance="error">
                    {this.props._shotsEnforcerName} wants everyone to take SHOTS!
                </Banner>
                <div class="shots-clip"><img src="images/shots.gif"/></div>
            </div>
          );
        return (
            <WarningBanner isOpen={true}/>
        );
    }
}

export default connect(_mapStateToProps)(ShotsWarning);

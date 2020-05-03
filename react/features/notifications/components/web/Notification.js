// @flow

import Flag from '@atlaskit/flag';
import EditorInfoIcon from '@atlaskit/icon/glyph/editor/info';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { colors } from '@atlaskit/theme';
import React from 'react';

import { translate } from '../../../base/i18n';
import {
    participantUpdated
} from '../../../base/participants';

import { NOTIFICATION_TYPE } from '../../constants';

import AbstractNotification, {
    type Props
} from '../AbstractNotification';

declare var interfaceConfig: Object;

/**
 * Secondary colors for notification icons.
 *
 * @type {{error, info, normal, success, warning}}
 */
const ICON_COLOR = {
    error: colors.R400,
    info: colors.N500,
    normal: colors.N0,
    success: colors.G400,
    warning: colors.Y200
};

/**
 * Implements a React {@link Component} to display a notification.
 *
 * @extends Component
 */
class Notification extends AbstractNotification<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const {
            hideErrorSupportLink,
            isDismissAllowed,
            onDismissed,
            t,
            title,
            titleArguments,
            titleKey,
            uid,
            assetLink,
            noActions
        } = this.props;

        return (
            this.props.appearance === NOTIFICATION_TYPE.ASSET ?
                <div className={'assetNotification'} style={!assetLink ? '' : {backgroundImage: `url(${assetLink})`}} >
                    <Flag
                    actions = { this._mapAppearanceToButtons(hideErrorSupportLink, noActions) }
                    appearance = { this._mapAppearance() }
                    description = { this._renderDescription() }
                    icon = { this._mapAppearanceToIcon() }
                    id = { uid }
                    isDismissAllowed = { isDismissAllowed }
                    onDismissed = { onDismissed }
                    title = { title || t(titleKey, titleArguments) } />
                </div>
            :
                <Flag
                actions = { this._mapAppearanceToButtons(hideErrorSupportLink) }
                appearance = { this._mapAppearance() }
                description = { this._renderDescription() }
                icon = { this._mapAppearanceToIcon() }
                id = { uid }
                isDismissAllowed = { isDismissAllowed }
                onDismissed = { onDismissed }
                title = { title || t(titleKey, titleArguments) } />
        );
    }

    _getDescription: () => Array<string>

    _onDismissed: () => void;

    _oneMoreBeerClick() {
        const { localParticipantID, localParticipant } = this.props;
        let beerCount = localParticipant.beerCount ?? 0;

        this.props.dispatch(participantUpdated({
            id: localParticipantID,
            beerCount: ++beerCount,
            local: true,
            beerTimeStamp: Date.now()
        }));

        this._onDismissed();
    }

    _noBeerClick() {
        const { localParticipantID, localParticipant } = this.props;
        let rejectCount = localParticipant.rejectedNewRoundCount ?? 0;

        this.props.dispatch(participantUpdated({
            id: localParticipantID,
            local: true,
            rejectedNewRoundCount: ++rejectCount,
        }));

        this._onDismissed();
    }

    /**
     * Creates a {@code ReactElement} for displaying the contents of the
     * notification.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderDescription() {
        return (
            <>
                <div>
                    {
                        this._getDescription()
                    }
                </div>

                {
                    (this.props.appearance === NOTIFICATION_TYPE.ASSET) ? <div className='notificationAssetContent' /> : null
                }
            </>
        );
    }

    /**
     * Opens the support page.
     *
     * @returns {void}
     * @private
     */
    _onOpenSupportLink() {
        window.open(interfaceConfig.SUPPORT_URL, '_blank', 'noopener');
    }

    /**
     * Creates action button configurations for the notification based on
     * notification appearance.
     *
     * @param {boolean} hideErrorSupportLink - Indicates if the support link
     * @param {boolean} noActions - Indicates if actions are accepted
     * 
     * should be hidden in the error messages.
     * @private
     * @returns {Object[]}
     */
    _mapAppearanceToButtons(hideErrorSupportLink, noActions) {
        switch (this.props.appearance) {
        case NOTIFICATION_TYPE.ERROR: {
            const buttons = [
                {
                    content: this.props.t('dialog.dismiss'),
                    onClick: this._onDismissed
                }
            ];

            if (!hideErrorSupportLink) {
                buttons.push({
                    content: this.props.t('dialog.contactSupport'),
                    onClick: this._onOpenSupportLink
                });
            }

            return buttons;
        }
        case NOTIFICATION_TYPE.WARNING:
            return [
                {
                    content: this.props.t('dialog.Ok'),
                    onClick: this._onDismissed
                }
            ];
        case NOTIFICATION_TYPE.ASSET:
            if(noActions) {
                return setTimeout(() => this._onDismissed(), 4000);
            }
            else {
                return [
                    {
                        content: this.props.t('dialog.oneMoreYes'),
                        onClick: () => this._oneMoreBeerClick(),
                    },
                    { 
                        content: this.props.t('dialog.oneMoreNo'), 
                        onClick: () => this._noBeerClick()
                    },
                ];
            }

        default:
            if (this.props.customActionNameKey && this.props.customActionHandler) {
                return [
                    {
                        content: this.props.t(this.props.customActionNameKey),
                        onClick: () => {
                            if (this.props.customActionHandler()) {
                                this._onDismissed();
                            }
                        }
                    }
                ];
            }

            return [];
        }
    }

    /**
     * Creates an icon component depending on the configured notification
     * appearance.
     *
     * @private
     * @returns {ReactElement}
     */
    _mapAppearanceToIcon() {
        const appearance = this.props.appearance;
        const secIconColor = ICON_COLOR[this.props.appearance];
        const iconSize = 'medium';

        switch (appearance) {
        case NOTIFICATION_TYPE.ERROR:
            return (
                <ErrorIcon
                    label = { appearance }
                    secondaryColor = { secIconColor }
                    size = { iconSize } />
            );

        case NOTIFICATION_TYPE.WARNING:
            return (
                <WarningIcon
                    label = { appearance }
                    secondaryColor = { secIconColor }
                    size = { iconSize } />
            ); 
        default:
            return (
                <EditorInfoIcon
                    label = { appearance }
                    secondaryColor = { secIconColor }
                    size = { iconSize } />
            );
        }
    }

    /**
     * @private
     * @returns {ReactElement}
     */
    _mapAppearance() {
        return this.props.appearance === NOTIFICATION_TYPE.ASSET ? 
            NOTIFICATION_TYPE.NORMAL : 
            this.props.appearance
    }
}

export default translate(Notification);

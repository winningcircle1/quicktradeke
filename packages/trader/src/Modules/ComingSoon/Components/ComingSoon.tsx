import React from 'react';
import { PageError } from '@deriv/components';
import { getUrlBase, routes } from '@deriv/shared';
import { useTranslations } from '@deriv-com/translations';

const ComingSoon = () => {
    const { localize } = useTranslations();
    return (
        <PageError
            header={localize('Deposits are coming soon')}
            messages={[
                localize("We're putting the finishing touches on deposits for QuickTrade Kenya."),
                localize('Check back soon — this feature will be available shortly.'),
            ]}
            redirect_urls={[routes.index]}
            redirect_labels={[localize('Return to trade')]}
            classNameImage='page-404__image'
            image_url={getUrlBase('/public/images/common/static_images/404.png')}
        />
    );
};

export default ComingSoon;

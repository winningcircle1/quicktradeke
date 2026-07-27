import { Text } from '@deriv/components';
import { LegacyReportsIcon } from '@deriv/quill-icons';
import BotIcon from 'Assets/SvgComponents/ic-bot.svg';
import { routes } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import { useTranslations } from '@deriv-com/translations';
import { BinaryLink } from '../../Routes';
import './menu-links.scss';

const getAuthAccessToken = () => {
    try {
        const info = JSON.parse(sessionStorage.getItem('auth_info') ?? 'null');
        if (!info) return null;
        if (info.expires_at && Date.now() >= info.expires_at) return null;
        return info.access_token ?? null;
    } catch {
        return null;
    }
};

const MenuItems = ({ id, text, icon, link_to, onClick }) => {
    return (
        <BinaryLink
            id={id}
            key={icon}
            to={link_to}
            onClick={onClick}
            className='header__menu-link'
            active_class='header__menu-link--active'
        >
            <Text size='m' line_height='xs' title={text} className='header__menu-link-text'>
                {icon}
                {text}
            </Text>
        </BinaryLink>
    );
};

const ReportTab = () => {
    const { localize } = useTranslations();
    return (
        <MenuItems
            id={'dt_reports_tab'}
            icon={<LegacyReportsIcon className='header__icon' iconSize='xs' fill='var(--color-text-primary)' />}
            text={localize('Reports')}
            link_to={routes.reports}
        />
    );
};

const BotsTab = observer(() => {
    const { localize } = useTranslations();
    const { client } = useStore();

    const handleBotsClick = e => {
        e.preventDefault();
        const account_type = client.is_virtual ? 'demo' : 'real';
        window.location.href = `https://bots.quicktradeke.site/?account_id=${client.loginid}&account_type=${account_type}&access_token=${getAuthAccessToken() ?? ''}`;
    };

    return (
        <MenuItems
            id={'dt_bots_tab'}
            icon={<BotIcon className='header__icon' style={{ width: '16px', height: '16px' }} />}
            text={localize('Bots')}
            link_to='#'
            onClick={handleBotsClick}
        />
    );
});

const MenuLinks = observer(({ is_traders_hub_routes = false }) => {
    const { currentLang } = useTranslations();
    const { client } = useStore();
    const { is_logged_in } = client;

    if (!is_logged_in) return <></>;

    return (
        <div key={`menu-links__${currentLang}`} className='header__menu-links'>
            <BotsTab />
            {!is_traders_hub_routes && <ReportTab />}
        </div>
    );
});

export default MenuLinks;

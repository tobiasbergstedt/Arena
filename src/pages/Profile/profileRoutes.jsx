import {
  USER_INFO,
  NOTIFICATIONS,
  PAYMENT_METHOD,
  BAN,
  SUSPENSION,
  HELP,
  FEEDBACK,
  INFO,
  WINNING_PLAN,
  WINNERS_LIST,
  TERMS,
  PRIVACY,
} from 'components/ButtonsSection/NavButton/renderIcon';
import EditProfile from './subRoutes/EditProfile/EditProfile';
import PersonalInformation from './subRoutes/PersonalInformation/PersonalInformation';
import NeedHelp from './subRoutes/NeedHelp/NeedHelp';

import i18n from 'i18next';
const { t } = i18n;

const routes = [
  {
    header: t('profilePage.menu.settingsHeader'),
    needsAuthentication: true,
    subroutes: [
      {
        href: 'personal-information',
        iconType: USER_INFO,
        label: t('profilePage.menu.personalInfo'),
        path: '/personal-information/*',
        component: <PersonalInformation />,
      },
      {
        href: 'edit-profile',
        iconType: NOTIFICATIONS,
        label: t('profilePage.menu.notifications'),
        path: '/edit-profile/*',
        component: <EditProfile />,
      },
      {
        href: 'edit-profile',
        iconType: PAYMENT_METHOD,
        label: t('profilePage.menu.payments'),
        path: '/edit-profile/*',
        component: <EditProfile />,
      },
      {
        href: 'edit-profile',
        iconType: BAN,
        label: t('profilePage.menu.gameLimits'),
        path: '/edit-profile/*',
        component: <EditProfile />,
      },
      {
        href: 'edit-profile',
        iconType: SUSPENSION,
        label: t('profilePage.menu.gameStop'),
        path: '/edit-profile/*',
        component: <EditProfile />,
      },
    ],
  },
  {
    header: t('profilePage.menu.helpHeader'),
    subroutes: [
      {
        href: 'do-you-need-help',
        iconType: HELP,
        label: t('profilePage.menu.needHelp'),
        path: '/do-you-need-help/*',
        component: <NeedHelp />,
      },
      {
        href: 'do-you-need-help',
        iconType: FEEDBACK,
        label: t('profilePage.menu.whatDoYouThinkAboutUs'),
        path: '/do-you-need-help/*',
        component: <NeedHelp />,
      },
    ],
  },
  {
    header: t('profilePage.menu.legalHeader'),
    subroutes: [
      {
        href: 'do-you-need-help',
        iconType: INFO,
        label: t('profilePage.menu.thisIsPangeo'),
        path: '/do-you-need-help/*',
        component: <NeedHelp />,
      },
      {
        href: 'do-you-need-help',
        iconType: WINNING_PLAN,
        label: t('profilePage.menu.gamePlan'),
        path: '/do-you-need-help/*',
        component: <NeedHelp />,
      },
      {
        href: 'do-you-need-help',
        iconType: WINNERS_LIST,
        label: t('profilePage.menu.winners'),
        path: '/do-you-need-help/*',
        component: <NeedHelp />,
      },
      {
        href: 'do-you-need-help',
        iconType: TERMS,
        label: t('profilePage.menu.userAgreement'),
        path: '/do-you-need-help/*',
        component: <NeedHelp />,
      },
      {
        href: 'do-you-need-help',
        iconType: PRIVACY,
        label: t('profilePage.menu.integrityPolicy'),
        path: '/do-you-need-help/*',
        component: <NeedHelp />,
      },
    ],
  },
];

export default routes;

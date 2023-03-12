import { ReactComponent as UserInfoIcon } from 'assets/icons/navigation-bar-icons/account-small.svg';
import { ReactComponent as NotificationsIcon } from 'assets/icons/navigation-bar-icons/notifications.svg';
import { ReactComponent as PaymentMethodIcon } from 'assets/icons/navigation-bar-icons/payment-method.svg';
import { ReactComponent as BanIcon } from 'assets/icons/navigation-bar-icons/ban.svg';
import { ReactComponent as SuspensionIcon } from 'assets/icons/navigation-bar-icons/suspension.svg';
import { ReactComponent as HelpIcon } from 'assets/icons/navigation-bar-icons/help-outline.svg';
import { ReactComponent as FeedbackIcon } from 'assets/icons/navigation-bar-icons/feedback-outline.svg';
import { ReactComponent as InfoIcon } from 'assets/icons/navigation-bar-icons/info-outline.svg';
import { ReactComponent as WinningPlanIcon } from 'assets/icons/navigation-bar-icons/winning-plan.svg';
import { ReactComponent as WinnersListIcon } from 'assets/icons/navigation-bar-icons/winners-list.svg';
import { ReactComponent as TermsIcon } from 'assets/icons/navigation-bar-icons/terms.svg';
import { ReactComponent as PrivacyIcon } from 'assets/icons/navigation-bar-icons/privacy.svg';

export const USER_INFO = 'USER_INFO';
export const NOTIFICATIONS = 'NOTIFICATIONS';
export const PAYMENT_METHOD = 'PAYMENT_METHOD';
export const BAN = 'BAN';
export const SUSPENSION = 'SUSPENSION';
export const HELP = 'HELP';
export const FEEDBACK = 'FEEDBACK';
export const INFO = 'INFO';
export const WINNING_PLAN = 'WINNING_PLAN';
export const WINNERS_LIST = 'WINNERS_LIST';
export const TERMS = 'TERMS';
export const PRIVACY = 'PRIVACY';

export const renderIcon = (type, className) => {
  switch (type) {
    case USER_INFO:
      return <UserInfoIcon className={className} />;
    case NOTIFICATIONS:
      return <NotificationsIcon className={className} />;
    case PAYMENT_METHOD:
      return <PaymentMethodIcon className={className} />;
    case BAN:
      return <BanIcon className={className} />;
    case SUSPENSION:
      return <SuspensionIcon className={className} />;
    case HELP:
      return <HelpIcon className={className} />;
    case FEEDBACK:
      return <FeedbackIcon className={className} />;
    case INFO:
      return <InfoIcon className={className} />;
    case WINNING_PLAN:
      return <WinningPlanIcon className={className} />;
    case WINNERS_LIST:
      return <WinnersListIcon className={className} />;
    case TERMS:
      return <TermsIcon className={className} />;
    case PRIVACY:
      return <PrivacyIcon className={className} />;
    default:
      return <UserInfoIcon className={className} />;
  }
};

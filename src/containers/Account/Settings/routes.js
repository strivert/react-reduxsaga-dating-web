import AccountProfile from './AccountProfile';
import AccountInformation from './AccountInformation';
import CancelAccount from './CancelAccount';
import BlockedUser from './BlockedUsers';
import UpdateCredentials from './UpdateCredentials';
import PersonalityTest from './PersonalityTest';
import SubscriptionPlan from './SubscriptionPlan';
import PaymentMethod from './PaymentMethod';
import Help from './Help';

export const routes = [
  {
    path: '/account',
    exact: true,
    component: AccountProfile
  },
  {
    path: '/account/payment_method',
    component: PaymentMethod
  },
  {
    path: '/account/subscription_plan',
    component: SubscriptionPlan
  },
  {
    path: '/account/contact',
    component: AccountInformation
  },
  {
    path: '/account/change',
    component: UpdateCredentials
  },
  {
    path: '/account/cancel',
    component: CancelAccount
  },
  {
    path: '/account/personality_test',
    component: PersonalityTest
  },
  {
    path: '/account/block_user',
    component: BlockedUser
  },
  {
    path: '/account/help',
    component: Help
  }
]

import Apologetics from './Apologetics';
import PersonalityTest from '../Account/Settings/PersonalityTest';

export const routes = [
  {
    path: '/apologetics',
    exact: true,
    component: Apologetics
  },
  {
    path: '/apologetics/personality_test',
    component: PersonalityTest
  }
]

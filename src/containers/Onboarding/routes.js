import Intro from './Intro';
import Gender from './Gender';
import BodyType from './BodyType';
import EyeColor from './EyeColor';
import HairColor from './HairColor';
import ActivityLevel from './ActivityLevel';
import RateLooks from './RateLooks';
import Height from './Height';
import Personality from './Personality';
import Crisis from './Crisis';
import DifficultDecision from './DifficultDecision';
import PlanningThings from './PlanningThings';
import Clean from './Clean';
import Money from './Money';
import Pets from './Pets';
import EthnicBackground from './EthnicBackground';
import FamilyOrder from './FamilyOrder';
import MaritalStatus from './MaritalStatus';
import Goal from './Goal';
import HaveChildren from './HaveChildren';
import WantChildren from './WantChildren';
import WithChildren from './WithChildren';
import FarTravel from './FarTravel';
import Education from './Education';
import ReligiousBackground from './ReligiousBackground';
import MarryInChurch from './MarryInChurch';
import OftenChurch from './OftenChurch';
import OftenPray from './OftenPray';
import ReligiousUpbringing from './ReligiousUpbringing';
import PoliticalParty from './PoliticalParty';
import Drink from './Drink';
import Smoke from './Smoke';
import UploadPhoto from './UploadPhoto';
import HobbyInterest from './HobbyInterest';
export const routes = [{
    path: '/onboarding',
    component: Intro,
    exact: true,
  }, {
    path: '/onboarding/gender',
    exact: true,
    field: 'gender',
    component: Gender
  }, {
    path: '/onboarding/body-type',
    exact: true,
    field: 'weight',
    component: BodyType
  }, {
    path: '/onboarding/eye-color',
    exact: true,
    field: 'eye_color',
    component: EyeColor
  }, {
    path: '/onboarding/hair-color',
    exact: true,
    field: 'hair_color',
    component: HairColor
  }, {
    path: '/onboarding/activity-level',
    exact: true,
    field: 'activity_level',
    component: ActivityLevel
  }, {
    path: '/onboarding/rate-looks',
    exact: true,
    field: 'looks',
    component: RateLooks
  }, {
    path: '/onboarding/height',
    exact: true,
    field: 'height',
    component: Height
  }, {
    path: '/onboarding/personality',
    exact: true,
    field: 'personality',
    component: Personality
  }, {
    path: '/onboarding/crisis',
    exact: true,
    field: 'crisis',
    component: Crisis
  }, {
    path: '/onboarding/difficult-decision',
    exact: true,
    field: 'difficult_situation',
    component: DifficultDecision
  }, {
    path: '/onboarding/planning-things',
    exact: true,
    field: 'planning',
    component: PlanningThings
  }, {
    path: '/onboarding/clean',
    exact: true,
    field: 'tendtobe',
    component: Clean
  }, {
    path: '/onboarding/Money',
    exact: true,
    field: 'money',
    component: Money
  }, {
    path: '/onboarding/Pets',
    exact: true,
    field: 'pets',
    component: Pets
  }, {
    path: '/onboarding/ethnic-background',
    exact: true,
    field: 'ethnic_background',
    component: EthnicBackground
  }, {
    path: '/onboarding/family-order',
    exact: true,
    field: 'birth_order',
    component: FamilyOrder
  }, {
    path: '/onboarding/marital-status',
    exact: true,
    field: 'marital_status',
    component: MaritalStatus
  }, {
    path: '/onboarding/goal',
    exact: true,
    field: 'inamatch',
    component: Goal
  }, {
    path: '/onboarding/have-children',
    exact: true,
    field: 'children',
    component: HaveChildren
  }, {
    path: '/onboarding/want-children',
    exact: true,
    field: 'want_children',
    component: WantChildren
  }, {
    path: '/onboarding/with-children',
    exact: true,
    field: 'date_with_children',
    component: WithChildren
  }, {
    path: '/onboarding/far-travel',
    exact: true,
    field: 'driving_distance',
    component: FarTravel
  }, {
    path: '/onboarding/education',
    exact: true,
    field: 'education',
    component: Education
  },
  {
    path: '/onboarding/religious-background',
    exact: true,
    field: 'catholicity',
    component: ReligiousBackground
  },
  {
    path: '/onboarding/marry-church',
    exact: true,
    field: 'marry_church',
    component: MarryInChurch
  },
  {
    path: '/onboarding/often-church',
    exact: true,
    field: 'attendance',
    component: OftenChurch
  },
  {
    path: '/onboarding/often-pray',
    exact: true,
    field: 'pray',
    component: OftenPray
  },
  {
    path: '/onboarding/religious-upbrining',
    exact: true,
    field: 'raised_in',
    component: ReligiousUpbringing
  },
  {
    path: '/onboarding/political-party',
    exact: true,
    field: 'politics',
    component: PoliticalParty
  },
  {
    path: '/onboarding/drink',
    exact: true,
    field: 'drink',
    component: Drink
  },
  {
    path: '/onboarding/smoke',
    exact: true,
    field: 'smoke',
    component: Smoke
  },
  {
    path: '/onboarding/upload-photo',
    exact: true,
    field: 'photo',
    component: UploadPhoto
  },
  {
    path: '/onboarding/hobby-interest',
    exact:true,
    field: 'hobbies',
    component: HobbyInterest
  }
];

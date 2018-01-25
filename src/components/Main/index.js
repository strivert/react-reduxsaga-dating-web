import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../../containers/Dashboard';
import Profiles from '../../containers/Profiles';
import MemberProfile from '../../containers/MemberProfile';
import Login from '../../containers/Account/Login';
import ViewersFavoriteHub from '../../containers/ViewersFavoriteHub';
import NotFoundPage from '../NotFoundPage';
import AccountSettings from '../../containers/Account/Settings';
import PicturesManage from '../../containers/Account/Settings/PicturesManage';
import Messages from '../../containers/Messages';
import AccountUpgrade from '../../containers/Account/Upgrade';
import Onboarding from '../../containers/Onboarding';
import Reactivate from '../../containers/Account/Reactivate';
import SingleActivity from '../../containers/Dashboard/SingleActivity';
import Activities from '../../containers/Activities';

const Main = () =>
  <div className="main">
    <Switch>
      <Route exact path="/" component={Dashboard} />
	    <Route path="/login" component={Login} />
      <Route path="/reactivate" component={Reactivate} />
	    <Route exact path="/profiles" component={Profiles} />
      <Route path="/favorites" component={ViewersFavoriteHub} />
      <Route path="/profiles/:userId" component={MemberProfile} />
      <Route path="/account" component={AccountSettings} />
	    <Route path="/manage-pictures" component={PicturesManage} />
	    <Route path="/messages" component={Messages} />
      <Route path="/account-upgrade" component={AccountUpgrade} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/activities/:activityId" component={SingleActivity} />
      <Route path="/apologetics" component={Activities} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </div>

export default Main;

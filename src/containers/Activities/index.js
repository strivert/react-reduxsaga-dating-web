import React from 'react';
import Sidebar from './Sidebar';
import { Route } from 'react-router-dom';
import { routes } from './routes';

const Activities = () => (
  <div className="main__activities">
    <Sidebar />
    <div className="main_apologetics settings__main">
      {routes.map((route, key) => (
        <Route
          key={key}
          path={route.path}
          render={props => <route.component {...props} />}
          exact={route.exact}
        />
      ))}
    </div>
  </div>
)

export default Activities

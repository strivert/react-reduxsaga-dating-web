// TODO: import components to be associated with routes
import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import { ConnectedRouter } from 'react-router-redux';
import { withRouter } from 'react-router-dom';

const AppComponent = withRouter(App);

export default (store, history) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>
);
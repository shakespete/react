import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import KeycloakContainer from '../keycloak';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Auth';

import PrivateRoute from './utils';

const AppRouter = () => {
  return (
    <Router>
      <KeycloakContainer>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <PrivateRoute exact path="/home" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </KeycloakContainer>
    </Router>
  );
};

export default AppRouter;

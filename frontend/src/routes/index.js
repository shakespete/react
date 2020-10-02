import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import KeycloakContainer from '../keycloak';

import LoginPage from '../pages/auth';
import HomePage from '../pages/home';
import SitesPage from '../pages/management/sites';
import TenantsPage from '../pages/management/tenants';
import UsersPage from '../pages/management/users';
import AssetsPage from '../pages/assets';
import LocationsPage from '../pages/locations';
import BrandsPage from '../pages/brands';

import PrivateRoute from './utils';

const AppRouter = () => {
  return (
    <Router>
      <KeycloakContainer>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/management/sites" component={SitesPage} />
          <PrivateRoute
            exact
            path="/management/tenants"
            component={TenantsPage}
          />
          <PrivateRoute exact path="/management/users" component={UsersPage} />
          <PrivateRoute exact path="/assets" component={AssetsPage} />
          <PrivateRoute exact path="/locations" component={LocationsPage} />
          <PrivateRoute exact path="/brands" component={BrandsPage} />
        </Switch>
      </KeycloakContainer>
    </Router>
  );
};

export default AppRouter;

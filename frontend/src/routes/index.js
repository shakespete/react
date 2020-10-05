import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import KeycloakContainer from 'keycloak';

import LoginPage from 'pages/auth';
import Error404 from 'pages/error';
import PrivateRoute from './utils';
import routeList from 'routes/list';

const AppRouter = () => {
  return (
    <Router>
      <KeycloakContainer>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/error/404" component={Error404} />
          {routeList.map(({ path, Component, exact }) => (
            <PrivateRoute
              key
              path={path}
              exact={exact}
              component={props => {
                return (
                  <Suspense fallback={null}>
                    <Component key={props.location.pathname} {...props} />
                  </Suspense>
                );
              }}
            />
          ))}
        </Switch>
      </KeycloakContainer>
    </Router>
  );
};

export default AppRouter;

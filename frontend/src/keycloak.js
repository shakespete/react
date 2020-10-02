import React from 'react';
import PropTypes from 'prop-types';
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';

import LoginPage from './pages/auth';

const KeycloakContainer = ({ children }) => {
  let history = useHistory();
  let path = history.location.pathname;
  const realm = localStorage.getItem('realm');

  if (path === '/login' || !realm) {
    history.push('/login');
    return <LoginPage />;
  }

  const keycloakProviderInitConfig = {
    onLoad: 'login-required',
    responseMode: 'query',
  };

  const keycloakClient = new Keycloak({
    realm: realm,
    url: `${process.env.REACT_APP_KEYCLOAK_HOST}:${process.env.REACT_APP_KEYCLOAK_PORT}/auth/`,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  });

  const keycloakEventHandler = (ev, err) => {
    if (err) {
      console.log(err);
      // Pete: Redirect to 404 page
    }
    if (ev === 'onReady') {
      localStorage.setItem('token', keycloakClient.token);
      localStorage.setItem('userId', keycloakClient.subject);
      console.log(keycloakClient.resourceAccess);
    }
  };

  return (
    <KeycloakProvider
      keycloak={keycloakClient}
      initConfig={keycloakProviderInitConfig}
      onEvent={keycloakEventHandler}
    >
      {children}
    </KeycloakProvider>
  );
};

KeycloakContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KeycloakContainer;

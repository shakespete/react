import * as React from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  let history = useHistory();
  const { keycloak } = useKeycloak();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('realm');
    history.push('/login');
    keycloak.logout();
  };

  return (
    <div>
      Home
      {!!keycloak?.authenticated && (
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      )}
    </div>
  );
};

export default HomePage;

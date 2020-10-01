import * as React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const PrivateRoute = ({ Component, ...rest }) => {
  const [keycloak, initialized] = useKeycloak();
  if (!initialized) {
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Loader
          type="Circles"
          color="#aadb1d"
          height={80}
          width={80}
          timeout={3000}
        />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;

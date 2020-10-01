import * as React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const PrivateRoute = ({ component: Component }) => {
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

PrivateRoute.defaultProps = {
  component: null,
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
};

export default PrivateRoute;

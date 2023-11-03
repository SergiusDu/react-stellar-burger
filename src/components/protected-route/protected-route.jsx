import React from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({
  component: Component,
  isAuth,
  failedRedirectPath,
  ...rest
}) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props => isAuth ?
        (
          <Component {...props} />
        ) :
        (
            <Redirect to={{
              pathname: failedRedirectPath,
              search: location.search,
              state: { from: props.location }
            }} />
        )}
    />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    isAuth: PropTypes.bool.isRequired,
    failedRedirectPath: PropTypes.string.isRequired
};
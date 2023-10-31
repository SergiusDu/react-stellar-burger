import React, {useEffect} from 'react';
import {Redirect, Route, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setRedirectAfterLogin} from '../../services/slices/login-form-slice';

function ProtectedRoute({
  component: Component,
  authFunction,
  failedRedirectPath,
  ...rest
}) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={props => authFunction ?
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

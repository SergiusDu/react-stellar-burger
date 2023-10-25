import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({component: Component, authFunction, redirectTo, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        authFunction() ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo}/>
        )
      }
    />
  );
}

export default ProtectedRoute;

import React, {useEffect} from 'react';
import {Route, Redirect, useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setRedirectAfterLogin} from "../../services/slices/login-form-slice";

function ProtectedRoute({component: Component, authFunction, redirectTo, successRedirectPath, failedRedirectPath,  ...rest}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = history;
    useEffect(() => {
        if(successRedirectPath) {
            dispatch(setRedirectAfterLogin(successRedirectPath));
        } else {
            dispatch(setRedirectAfterLogin(location));
        }
    }, [successRedirectPath, location, dispatch])

  return (
    <Route
      {...rest}
      render={props =>
        authFunction ? (
          <Component {...props} />
        ) : (
          <Redirect to={failedRedirectPath}/>
        )
      }
    />
  );
}

export default ProtectedRoute;

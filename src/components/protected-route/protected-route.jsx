import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, isAuth, redirectTo, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectTo} />
                )
            }
        />
    );
}

export default ProtectedRoute;

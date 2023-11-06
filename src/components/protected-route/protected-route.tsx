import React, { ComponentType, ReactElement } from 'react';
import { Redirect, Route, RouteProps, useLocation, RouteComponentProps } from 'react-router-dom';

// Обновление интерфейса с использованием Record<string, any>
interface ProtectedRouteProps extends RouteProps {
    component: ComponentType<RouteComponentProps<Record<string, any>>>;
    isAuth: boolean;
    failedRedirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           component: Component,
                                                           isAuth,
                                                           failedRedirectPath,
                                                           ...rest
                                                       }) => {
    const location = useLocation();
    return (
        <Route
            {...rest}
            render={(props): ReactElement => isAuth ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: failedRedirectPath,
                        search: location.search,
                        state: { from: props.location },
                    }}
                />
            )}
        />
    );
};

export default ProtectedRoute;

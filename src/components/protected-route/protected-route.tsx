import React, {ComponentType, ReactElement} from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  useLocation,
} from 'react-router-dom';

// Обновление интерфейса с использованием Record<string, any>
interface ProtectedRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<Record<string, any>>>;
  isAuth: boolean;
  failedRedirectPath: string;
  searchParams?: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component, isAuth, failedRedirectPath, searchParams=null, ...rest
}) => {
  const location = useLocation();
  return (
    <Route exact
      {...rest}
      render={(props): ReactElement => isAuth ?
        (
          <Component {...props} />
        ) :
        (
          <Redirect
            to={{
              pathname: failedRedirectPath, search: (searchParams || location.search), state: {from: props.location},
            }}
          />
        )}
    />
  );
};

export default ProtectedRoute;

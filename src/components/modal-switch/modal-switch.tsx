import {
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import {
  FEED_ORDER_ID_PATH,
  FEED_PAGE_PATH,
  FORGOT_PASSWORD_PAGE_PATH,
  INGREDIENT_BY_ID_PAGE_PATH,
  LOGIN_PAGE_PATH,
  MAIN_PAGE_PATH,
  PROFILE_PAGE_PATH,
  REGISTER_PAGE_PATH,
  RESET_PASSWORD_PAGE_PATH,
} from '../../utils/constants';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import {ForgotPassword} from '../../pages/forgot-password/forgot-password';
import {Profile} from '../../pages/profile/profile';
import {ResetPassword} from '../../pages/reset-password/reset-password';
import Home from '../../pages/home/home';
import {IngredientPage} from '../../pages/ingredient/ingredientPage';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetPasswordPageAvailability,
} from '../../services/slices/reset-password-slice';
import {profilePageAvailability} from '../../services/slices/profile-slice';
import {
  closeModal,
  resetSelectedIngredient,
} from '../../services/slices/ingredient-slice';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {MatchParams} from '../../utils/types';
import {AppDispatch} from '../../services/store/store';
import {Feed} from '../../pages/feed/feed';
import {OrderInformation} from '../order-information/order-Information';

export const ModalSwitch: React.FC = () => {
  const location = useLocation<{
    background?: RouteProps['location']
  }>();
  const background = location.state && location.state.background;
  const resetPasswordAvailability = useSelector(resetPasswordPageAvailability);
  const profileAvailability = useSelector(profilePageAvailability);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const handleCloseIngredientDetails = () => {
    dispatch(resetSelectedIngredient());
    dispatch(closeModal());
    history.goBack();
  };

  return (
    <>
      <Switch location={background || location}>
        <ProtectedRoute
          path={LOGIN_PAGE_PATH}
          component={Login}
          isAuth={!profileAvailability}
          failedRedirectPath={MAIN_PAGE_PATH}
        />
        <ProtectedRoute
          path={REGISTER_PAGE_PATH}
          component={Register}
          isAuth={!profileAvailability}
          failedRedirectPath={MAIN_PAGE_PATH}
        />
        <ProtectedRoute
          path={FORGOT_PASSWORD_PAGE_PATH}
          component={ForgotPassword}
          isAuth={!profileAvailability}
          failedRedirectPath={MAIN_PAGE_PATH}
        />
        <ProtectedRoute
          path={PROFILE_PAGE_PATH}
          component={Profile}
          isAuth={profileAvailability}
          failedRedirectPath={LOGIN_PAGE_PATH}
        />
        <ProtectedRoute
          path={RESET_PASSWORD_PAGE_PATH}
          component={ResetPassword}
          isAuth={resetPasswordAvailability}
          failedRedirectPath={FORGOT_PASSWORD_PAGE_PATH}
        />
        <ProtectedRoute
          path={RESET_PASSWORD_PAGE_PATH}
          component={ResetPassword}
          isAuth={resetPasswordAvailability}
          failedRedirectPath={FORGOT_PASSWORD_PAGE_PATH}
        />
        <Route path={FEED_PAGE_PATH} component={Feed} />
        <Route
          path={INGREDIENT_BY_ID_PAGE_PATH}
          render={(routeProps: RouteComponentProps<MatchParams>) => (
            <IngredientPage >
              <IngredientDetails {...routeProps} />
            </IngredientPage >
          )}
        />
        <Route path={FEED_ORDER_ID_PATH}
        render={(routerProps: RouteComponentProps<MatchParams>) => (
          <IngredientPage>
            <OrderInformation {...routerProps} />
          </IngredientPage>
        )}
        />
        <Route
          exact
          component={Home}
          path={MAIN_PAGE_PATH}
        />
      </Switch >
      {background && <Route
        path={INGREDIENT_BY_ID_PAGE_PATH}
        render={(routeProps: RouteComponentProps<MatchParams>) => <Modal
          onClose={handleCloseIngredientDetails}
          title={`Детали ингредиента`}
        >
          <IngredientDetails {...routeProps} />
        </Modal >}
      /> ||
        <Route
          path={FEED_ORDER_ID_PATH}
          render={(routeProps: RouteComponentProps<MatchParams>) => <Modal
            onClose={handleCloseIngredientDetails}
          >
            <OrderInformation {...routeProps} />
          </Modal >}
        />
      }
      {background && <Route
        path={FEED_ORDER_ID_PATH}
        render={(routeProps: RouteComponentProps<MatchParams>) => <Modal
          onClose={handleCloseIngredientDetails}
        >
          <OrderInformation {...routeProps} />
        </Modal >}
      />}
    </>
  );
};

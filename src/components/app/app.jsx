import React, {useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch, useHistory, useLocation} from "react-router-dom";
import Home from "../../pages/home/home";
import styles from "../app/app.module.css";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Profile} from "../../pages/profile/profile";
import {Ingredient} from "../../pages/ingredient/ingredient";
import ProtectedRoute from "../protected-route/protected-route";
import {checkAuthToken} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {resetPasswordPageAvailability} from "../../services/slices/reset-password-slice";
import {profilePageAvailability, setProfilePageAvailable} from "../../services/slices/profile-slice";
import {
    FORGOT_PASSWORD_PAGE_PATH,
    INGREDIENT_BY_ID_PAGE_PATH,
    LOGIN_PAGE_PATH,
    MAIN_PAGE_PATH,
    PROFILE_PAGE_PATH, REGISTER_PAGE_PATH, RESET_PASSWORD_PAGE_PATH,
} from '../../utils/constants';

function App() {
    const resetPasswordAvailability = useSelector(resetPasswordPageAvailability);
    const profileAvailability       = useSelector(profilePageAvailability);
    const dispatch                  = useDispatch();
    useEffect(() => {
        dispatch(setProfilePageAvailable());
    }, [dispatch])
    return (<div className={styles.app}>
        <Router basename={"/"}>
            <Switch>
                <ProtectedRoute
                    path={LOGIN_PAGE_PATH}
                    component={Login}
                    authFunction={!profileAvailability}
                    failedRedirectPath={MAIN_PAGE_PATH}
                />
                <Route path={REGISTER_PAGE_PATH}>
                    <Register />
                </Route >
                <Route path={FORGOT_PASSWORD_PAGE_PATH}>
                    <ForgotPassword />
                </Route >
                <ProtectedRoute
                    path={PROFILE_PAGE_PATH}
                    component={Profile}
                    authFunction={profileAvailability}
                    successRedirectPath={PROFILE_PAGE_PATH}
                    failedRedirectPath={`${LOGIN_PAGE_PATH}?redirectTo=${encodeURIComponent(PROFILE_PAGE_PATH)}`}
                />
                <ProtectedRoute
                    path={RESET_PASSWORD_PAGE_PATH}
                    component={ResetPassword}
                    authFunction={resetPasswordAvailability}
                    successRedirectPath={RESET_PASSWORD_PAGE_PATH}
                    failedRedirectPath={LOGIN_PAGE_PATH}
                />
                <Route
                    path={INGREDIENT_BY_ID_PAGE_PATH}
                    component={Ingredient}
                />
                <Route exact path="/">
                    <Home />
                </Route >
            </Switch >
        </Router >
    </div >);
}

export default App;

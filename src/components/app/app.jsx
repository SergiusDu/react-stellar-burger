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

function App() {
    const resetPasswordAvailability = useSelector(resetPasswordPageAvailability);
    const profileAvailability       = useSelector(profilePageAvailability);
    const dispatch                  = useDispatch();
    useEffect(() => {
        dispatch(setProfilePageAvailable());
    }, [dispatch])
    return (<div className={styles.app}>
        <Router basename={"/"}>
            <Switch >
                <ProtectedRoute
                    path={"/login"}
                    component={Login}
                    authFunction={false}
                    successRedirectPath={'/'}
                    failedRedirectPath={'/'}
                />
                <Route path={"/register"}>
                    <Register />
                </Route >
                <Route path={"/forgot-password"}>
                    <ForgotPassword />
                </Route >
                <ProtectedRoute
                    path={"/profile"}
                    component={Profile}
                    authFunction={profileAvailability}
                    successRedirectPath={'/profile'}
                    failedRedirectPath={'/login'}
                />
                <ProtectedRoute
                    path={"/reset-password"}
                    component={ResetPassword}
                    authFunction={resetPasswordAvailability}
                    successRedirectPath={'/reset-password'}
                    failedRedirectPath={'/login'}
                />
                <Route
                    path={"/ingredient/:id"}
                    component={Ingredient}
                />
                <Route path="/">
                    <Home />
                </Route >
            </Switch >
        </Router >
    </div >);
}

export default App;

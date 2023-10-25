import React, {useCallback} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from "react-router-dom";
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
import {useSelector} from "react-redux";
import {resetPasswordPageAvailability} from "../../services/slices/reset-password-slice";

function App() {
    const resetPasswordAvailability = useSelector(resetPasswordPageAvailability);
    return (<div className={styles.app}>
        <Router basename={"/"}>
            <Switch>
                <Route path={"/login"}>
                    <Login/>
                </Route>
                <Route path={"/register"}>
                    <Register/>
                </Route>
                <Route path={"/forgot-password"}>
                    <ForgotPassword/>
                </Route>
                <ProtectedRoute path={"/profile"}
                                component={Profile}
                                authFunction={checkAuthToken}
                                redirectTo={"/login"}/>
                <ProtectedRoute path={"/reset-password"}
                                component={ResetPassword}
                                isAuth={resetPasswordAvailability}
                                redirectTo={"/login"}/>
                <Route path={"/ingredient/:id"}
                       component={Ingredient}/>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    </div>);
}

export default App;

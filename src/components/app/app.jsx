import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from "react-router-dom";
import Home from "../../pages/home/home";
import styles from "../app/app.module.css";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";

function App() {


    return (
        <div className={styles.app}>
            <Router basename={"/"}>
              <Switch>
                <Route path={"/login"}>
                  <Login />
                </Route>
                <Route path={"/register"}>
                  <Register />
                </Route>
                <Route path={"/forgot-password"}>
                  <ForgotPassword />
                </Route>
                <Route path={"/reset-password"}>
                  <ResetPassword />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
        </div>
    );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Switch} from "react-router-dom";
import Home from "../../pages/home/home";
import styles from "../app/app.module.css";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";

function App() {


    return (
        <div className={styles.app}>
            <Router basename={"/app"}>
              <Switch>
                <Route path={"/login"}>
                  <Login />
                </Route>
                <Route path={"/register"}>
                  <Register />
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

import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";

import Posts from "../../components/Posts/Posts";

import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import ThreadPage from "../ThreadPage/ThreadPage";

import userService from "../../services/userService";

import "./App.css";

const App = () => {
  const [user, setUser] = useState("");

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Switch>
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <>
              <LoginPage
                history={history}
                handleSignupOrLogin={handleSignupOrLogin}
              />
            </>
          )}
        ></Route>

        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <>
              <SignupPage
                history={history}
                handleSignupOrLogin={handleSignupOrLogin}
              />
            </>
          )}
        ></Route>
        <Route
          exact
          path="/posts"
          render={() => (
            <div>
              <Posts user={user} />
            </div>
          )}
        ></Route>
        <Route
          exact
          path="/thread"
          render={() => (
            <div>
              <ThreadPage />
            </div>
          )}
        ></Route>
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <>
              <LoginPage
                history={history}
                handleSignupOrLogin={handleSignupOrLogin}
              />
            </>
          )}
        ></Route>

        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <>
              <SignupPage
                history={history}
                handleSignupOrLogin={handleSignupOrLogin}
              />
            </>
          )}
        ></Route>

        <Route
          exact
          path="/posts"
          render={() => (
            <div>
              <Posts user={user} />
            </div>
          )}
        ></Route>
      </Switch>
    </>
  );
};

export default App;

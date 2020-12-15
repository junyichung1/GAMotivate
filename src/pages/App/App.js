import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";

import Posts from "../../components/Posts/Posts";

import LandingPage from "../../pages/LandingPage/LandingPage";
import SignupPage from "../SignupPage/SignupPage";
import ThreadPage from "../ThreadPage/ThreadPage";

import * as postsAPI from "../../services/posts-api";

import userService from "../../services/userService";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const postData = await postsAPI.getAll();
    setPosts(postData.reverse());
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  return (
    <>
      <Switch>
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <>
              <LandingPage
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
              <NavBar user={user} handleLogout={handleLogout} />
              <Posts user={user} posts={posts} getPosts={getPosts} />
            </div>
          )}
        ></Route>
        <Route
          exact
          path="/posts/:id"
          render={() => (
            <div>
              <NavBar user={user} handleLogout={handleLogout} />
              <ThreadPage user={user} posts={posts} />
            </div>
          )}
        ></Route>
      </Switch>
    </>
  );
};

export default App;

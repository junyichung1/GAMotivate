import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

import Posts from '../../components/Posts/Posts';

import LoginLandingPage from '../LandingPage/LoginLandingPage';
import SignUpLandingPage from '../LandingPage/SignUpLandingPage'
import PostPage from '../PostPage/PostPage'

import * as postsAPI from "../../services/posts-api"
import userService from "../../services/userService";
import UserPage from "../UserPage/UserPage";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState("");


  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
        const postData = await postsAPI.getAll()
        setPosts(postData.reverse())
    }

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
        <Route exact path="/login" render={({history}) => 
          <LoginLandingPage 
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
          />
        }></Route>

        <Route exact path="/signup" render={({history}) => 
            <SignUpLandingPage
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
            />
        }></Route>
        
        <Route exact path="/posts" render={() => 
          <>
            <NavBar user={user} handleLogout={handleLogout} />
            <Posts user={user} posts={posts} getPosts={getPosts}/>
          </>
        }></Route>

        <Route exact path="/user/:id" render={() => 
          <>
            <NavBar user={user} handleLogout={handleLogout} />
            <UserPage user={user}/>
          </>
        }></Route>

        <Route exact path="/post/:id" render={() => 
          <>
            <NavBar user={user} handleLogout={handleLogout} />
            <PostPage user={user} posts={posts}/>
          </>
        }></Route>
      </Switch>
    </>
  );
};

export default App;
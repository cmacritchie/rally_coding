import React, { useEffect } from 'react'
import { HashRouter,  Route } from 'react-router-dom';
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux";
import NavBar from './components/NavBar'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NewArticle from './pages/NewArticle'

import { getMe } from './actions/userActions'



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe())
  })

  return (
    <HashRouter>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/sign-up" component={Signup} />
      <Route path="/post-article" component={NewArticle} />
      <Route path="/post-article/:articleid" component={NewArticle} />
    </HashRouter>
  );
}

export default App;

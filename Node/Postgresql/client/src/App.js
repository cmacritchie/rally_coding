import React, { useEffect } from 'react'
import { HashRouter,  Route } from 'react-router-dom';
import NavBar from './components/NavBar'

import Home from './pages/Home'
import Login from './pages/Login'
import NewArticle from './pages/NewArticle'


function App() {
  return (
    <HashRouter>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/post-article" component={NewArticle} />
      <Route path="/post-article/:id" component={NewArticle} />
    </HashRouter>
  );
}

export default App;

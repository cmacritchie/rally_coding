import React from 'react';
import { HashRouter,  Route } from 'react-router-dom';
import Home from  './pages/Home'
import UserPage from './components/UserWrapper';
import NavigationBar from './components/NavigationBar'
import UserWrapper from './components/UserWrapper';
import ObjectivePage from './pages/ObjectivePage'

const App: React.FC = () => {
  return (
    <HashRouter >
      <NavigationBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/user" component={UserWrapper} />
      <Route exact path="/user/:id" component={UserWrapper} />
      <Route exact path="/user/:id/objective"component={ObjectivePage} />
      <Route exact path="/user/:id/objective/:objid"component={ObjectivePage} />
    </HashRouter>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, HashRouter, IndexRoute } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import AuthorCreate from './pages/AuthorCreate';
import AuthorDetail from './pages/AuthorDetail';
import AuthorList from './pages/AuthorList'

const options ={
  dataIdFromObject: o => o.id
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(options)
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter >
        <Route path="/" component={AuthorList} />
      </HashRouter>
    </ApolloProvider>
  )
}



ReactDOM.render(
  <Root />,
  document.getElementById('root')
);


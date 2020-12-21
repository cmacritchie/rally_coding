import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, HashRouter, IndexRoute } from 'react-router-dom';
import { ApolloClient, InMemoryCache, gql, HttpLink, ApolloProvider } from '@apollo/client';
// import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import AuthorCreate from './components/AuthorCreate';
import AuthorDetail from './pages/AuthorDetail';
import AuthorList from './pages/AuthorList'
import BookLibraryList from './pages/BookLibraryList'
import LibraryList from './pages/LibraryList'

import Navigation from './components/Navigation';
import './css/style.css'

const options ={
  dataIdFromObject: o => o.id
}

// const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql'})

const client = new ApolloClient({
  // uri: httpLink,
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(options)
});

client.query({
  query: gql `{
    books{
      name
    }
  }`
}).then(result => console.log(result)).catch(err => console.log(err))

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter >
        <Navigation />
        <Route exact path="/" component={AuthorList} />
        <Route exact path="/author-form" component={AuthorCreate} />
        <Route path="/author-form/:authorid" component={AuthorCreate} />
        <Route path="/author/:authorid" component={AuthorDetail} />
        <Route exact path="/libraries" component={LibraryList} />
        <Route path ="/book-library" component={BookLibraryList} />
      </HashRouter>
    </ApolloProvider>
  )
}



ReactDOM.render(
  <Root />,
  document.getElementById('root')
);


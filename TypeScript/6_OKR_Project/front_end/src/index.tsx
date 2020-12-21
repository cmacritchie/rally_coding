import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import rootReducer from './store'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension';

declare global {   
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;
// const composeEnhancers = composeWithDevTools({trace: true})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)))


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);


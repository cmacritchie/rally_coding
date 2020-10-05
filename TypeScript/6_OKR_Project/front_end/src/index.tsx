import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import rootReducer from './store'
import { Provider } from 'react-redux'
import { createStore, compose} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
// const composeEnhancers = composeWithDevTools({trace: true})

export const store = createStore(rootReducer, composeEnhancers())


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);


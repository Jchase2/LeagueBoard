import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
// provider keeps track of the store and lets us access to the store
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import App from './App';
import reducers from './redux/reducers';

declare global {
  interface Window {
    //this creates the redux-devtool extension with a basic redux store
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers( 
  // thunk allows us to handle asynchronous actions in redux
  applyMiddleware(thunk),
  // other store enhancers if any
));

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


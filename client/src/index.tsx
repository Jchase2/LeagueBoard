import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { store } from './redux/store';
import { Provider } from 'react-redux'
import App from './App';

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


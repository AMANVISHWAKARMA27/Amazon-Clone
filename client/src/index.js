/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import the Provider
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './App';
import ContextProvider from "./components/context/ContextProvider.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ContextProvider>
);
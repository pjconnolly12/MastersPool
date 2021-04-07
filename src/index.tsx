import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css';
import App from './App';
import { StoreProvider } from './tools/context'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);


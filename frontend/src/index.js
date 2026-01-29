import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App'; // VOLTA PARA App NORMAL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
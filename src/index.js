import React from 'react';
import './index.css';
import App from './App';
import config from './config';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import { render } from 'react-dom';

Amplify.configure(config);

render(<React.StrictMode>
  <App />
</React.StrictMode>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

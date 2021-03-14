import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import './index.css';
import App from './App';
import configureAppStore from './store';
import { Provider } from 'react-redux';
import ReactBreakpoints from 'react-breakpoints';
import { BREAKPOINTS } from './constants';
// import reportWebVitals from './reportWebVitals';

const store = configureAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactBreakpoints breakpoints={BREAKPOINTS}>
        <App />
      </ReactBreakpoints>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

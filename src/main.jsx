import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
// import {browserHistory} from "history";
import App from './App'; 
import './index.css';
import {Provider} from 'react-redux';
import store from './store/index';
import {syncHistoryWithStore} from "react-router-redux";

// const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>
)

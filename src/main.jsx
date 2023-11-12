import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
// import {browserHistory} from "history";
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/index';
import { ThemeProvider } from 'react-jss';
import { JSS_THEMATIC_STYLES } from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <ThemeProvider theme={JSS_THEMATIC_STYLES}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

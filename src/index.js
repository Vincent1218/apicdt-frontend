import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';

import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap-4.0.0.css";


ReactDOM.render((
    
    <Router>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </Router>
    
  ), document.getElementById('root'))
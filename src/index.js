import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <BrowserRouter>
    <App />
    </BrowserRouter>
  
);

reportWebVitals();



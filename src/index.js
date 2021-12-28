// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter } from 'react-router-dom';

// core components
import Admin from "layouts/Admin.js";
import App from "App.js";

// redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Data
import Items from "api/Items.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

function reducer(state = Items.dashboard, action) {

  if(action.type === "dashboardAdd") {
    let dashCopy = [...state, action.dashboardAdd];
    return dashCopy
  }

  return state;
}

const hist = createBrowserHistory();
const store = createStore(reducer); 

ReactDOM.render(
  <BrowserRouter>
 
    {/* <Switch> */}
      <Provider store={store}>

        <App />

        {/* <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" /> */}
      </Provider>
    {/* </Switch> */}
  </BrowserRouter>,
  document.getElementById("root")
);
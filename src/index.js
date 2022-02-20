import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
// core components
import App from "App.js";

// redux
import { Provider } from 'react-redux';
import store from './modules/index';

import "assets/css/material-dashboard-react.css?v=1.9.0";

ReactDOM.render(
  <BrowserRouter>
 
    {/* <Switch> */}
      {/* <Provider store={store}> */}
      <Provider store={store}>
        <App />

        {/* <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" /> */}
      </Provider>
    {/* </Switch> */}
  </BrowserRouter>,
  document.getElementById("root")
);
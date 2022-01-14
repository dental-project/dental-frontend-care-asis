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
//import Items from "api/Items.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";


let test = {
  a: "a"
}

function reducer(state = test, action) {

  // if(action.type === "dashboardAdd") {
  //   let dashCopy = [...state, action.dashboardAdd];
  //   return dashCopy
  // }

  return state;
}

// const hist = createBrowserHistory();




const store = createStore(reducer); 

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
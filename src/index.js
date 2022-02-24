import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

// redux
import { Provider } from 'react-redux';
import store from './modules/index';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
)

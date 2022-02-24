import React, { useState } from "react";

// react-router components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Signin from "views/Auth/Signin.js";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";




// Soft UI Dashboard PRO React example components
// import Sidenav from "examples/Sidenav";
// import Sidenav from "components/Sidenav";
// import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Soft UI Dashboard PRO React routes
import routes from "routes";




export default function App() {
  




  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        {getRoutes(routes)}
        <Route path="/auth/signin" component={Signin} /> 
        <Route path="/dental" component={Admin} />
        <Redirect from="/" to="/auth/signin" />
      </Switch>
    </ThemeProvider>
  );
}

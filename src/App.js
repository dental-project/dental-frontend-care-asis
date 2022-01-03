import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Admin from "layouts/Admin.js";
import Signin from "views/Auth/Signin.js";

function App() {
  return (
    <Switch>
      <Route path="/auth/signin" component={Signin} /> 
      <Route path="/admin" component={Admin} />
      <Redirect path="/" to="/auth/signin" />
    </Switch>                
  );
}

export default App;

import React from 'react';
import Header from './Header.js';
import HomePage from './HomePage.js';
import AuthPage from './AuthPage.js';
import Card from './Card.js';
import '../index.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

let App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/oauth">
          <AuthPage />
        </Route>
        <Route path="/card/:id" >
          <Card />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
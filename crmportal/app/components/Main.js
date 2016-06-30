import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout";
import Tickets from "./pages/Tickets";
import Home from "./pages/Home";

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="tickets" component={Tickets}>
      </Route>
    </Route>
  </Router>
, app);

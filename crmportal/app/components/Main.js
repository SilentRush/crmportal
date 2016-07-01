import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Layout from "./pages/Layout";
import TicketListContainer from "./pages/ticket/TicketListContainer";
import TicketDetailContainer from "./pages/ticket/TicketDetailContainer";
import Home from "./pages/Home";
import SearchLayout from "./pages/SearchLayout";

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route component={SearchLayout}>
        <Route path="tickets" component={TicketListContainer}></Route>
      </Route>
      <Route path="tickets/:ticketid" component={TicketDetailContainer}></Route>
    </Route>
  </Router>
, app);

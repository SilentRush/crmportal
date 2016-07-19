import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from "react-router";

//Layouts
import Layout from "./components/layouts/Layout";
import SearchLayoutContainer from "./components/containers/SearchLayoutContainer";

//Pages
import TicketListContainer from "./components/containers/TicketListContainer";
import TicketDetailContainer from "./components/containers/TicketDetailContainer";
import AccountListContainer from "./components/containers/AccountListContainer";
import AccountDetailContainer from "./components/containers/AccountDetailContainer";
import Home from "./components/Home";


export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route component={SearchLayoutContainer}>
        <Route path="tickets" component={TicketListContainer}></Route>
      </Route>
      <Route path="tickets/:ticketid" component={TicketDetailContainer}></Route>
      <Route component={SearchLayoutContainer}>
        <Route path="accounts" component={AccountListContainer}></Route>
      </Route>
      <Route path="accounts/:accountid" component={AccountDetailContainer}></Route>
    </Route>
  </Router>
);

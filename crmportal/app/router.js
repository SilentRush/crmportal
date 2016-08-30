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
import ContactListContainer from "./components/containers/ContactListContainer";
import ContactDetailContainer from "./components/containers/ContactDetailContainer";
import HistoryListContainer from "./components/containers/HistoryListContainer";
import HistoryDetailContainer from "./components/containers/HistoryDetailContainer";
import BlogListContainer from "./components/containers/BlogListContainer";
import BlogDetailContainer from "./components/containers/BlogDetailContainer";
import BlogInsertContainer from "./components/containers/BlogInsertContainer";
import Login from "./components/Login";
import Home from "./components/Home";

var InsertBlogWrapper = React.createClass({
  render () {
    return (
      <BlogInsertContainer isInsert="true" />
    );
  }
});

var UpdateBlogWrapper = React.createClass({
  render () {
    return (
      <BlogInsertContainer isUpdate="true" />
    );
  }
});


export default (
  <Router history={browserHistory}>
    <Route path="/login" component={Login}></Route>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route component={SearchLayoutContainer}>
        <Route path="tickets" component={TicketListContainer}>
        </Route>
        <Route path="accounts" component={AccountListContainer}>
        </Route>
        <Route path="contacts" component={ContactListContainer}>
        </Route>
        <Route path="blogs" component={BlogListContainer}>
        </Route>
        <Route path="histories" component={HistoryListContainer}>
        </Route>
      </Route>
      <Route path="/ticket/:ticketid" component={TicketDetailContainer}></Route>
      <Route path="/account/:accountid" component={AccountDetailContainer}></Route>
      <Route path="/contact/:contactid" component={ContactDetailContainer}></Route>
      <Route path="/history/:historyid" component={HistoryDetailContainer}></Route>
      <Route path="/blog/:blogid" component={BlogDetailContainer}></Route>
      <Route path="insert/blog" component={InsertBlogWrapper}></Route>
      <Route path="update/blog" component={UpdateBlogWrapper}></Route>
      <Route path="*" component={Login}/>
    </Route>
  </Router>
);

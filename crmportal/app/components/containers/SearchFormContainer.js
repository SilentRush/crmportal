import React from 'react';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import * as contactApi from '../../api/contact-api';
import * as blogApi from '../../api/blog-api';
import * as historyApi from '../../api/history-api';
import { loadSearchLayout } from '../../actions/search-layout-actions';
import SearchForm from '../views/SearchForm';
import {Location} from 'react-router';

export default class SearchFormContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {query:'',historyQuery:{}};
    this.onChangeQuery = (value) => {
      this.setState({query:value});
    }
    this.onChangeHistoryQuery = (value) => {
      this.setState({historyQuery:value});
    }
    this.searchQuery = (event) => {
      event.preventDefault();

      // By assigning a "child" ref to <SearchForm />, we
      // can use that reference to gain access to the
      // .getQuery() method. See the code for
      // <SearchForm /> to see how it returns a value.
      let query = this.state.query;

      if (this.props.searchType === 'tickets') {
        if(query)
          ticketApi.searchTickets(query,0,40).then(()=>{
            this.context.router.push('/tickets?q=' + query);
          });
        else
          ticketApi.getTickets(0, 40).then(()=>{
            this.context.router.push('/tickets');
          });
      }
      if (this.props.searchType === 'accounts') {
        if(query)
          accountApi.searchAccounts(query,0,40).then(()=>{
            this.context.router.push('/accounts?q=' + query);
          });
        else
          accountApi.searchAccounts(0, 40).then(()=>{
            this.context.router.push('/accounts');
          });
      }
      if (this.props.searchType === 'contacts') {
        if(query)
          contactApi.searchContacts(query,0,40).then(()=>{
            this.context.router.push('/contacts?q=' + query);
          });
        else
          contactApi.searchContacts(0, 40).then(()=>{
            this.context.router.push('/contacts');
          });
      }
      if (this.props.searchType === 'blogs') {
        if(query)
          blogApi.searchBlogs(query,0,40).then(()=>{
            this.context.router.push('/blogs?q=' + query);
          });
        else
          blogApi.searchBlogs(0, 40).then(()=>{
            this.context.router.push('/blogs');
          });
      }
      if (this.props.searchType === 'histories') {
        var q = [];
        if(this.state.historyQuery.account){
          if(this.state.historyQuery.account instanceof Array){
            var a = this.state.historyQuery.account.map((acc)=>{
              q.push("a=" + acc);
              return;
            });
          }
          else {
            q.push("a=" + this.state.historyQuery.account);
          }
        }
        if(this.state.historyQuery.contact){
          if(this.state.historyQuery.contact instanceof Array){
            var c = this.state.historyQuery.contact.map((con)=>{
              q.push("c=" + con);
              return;
            });
          }
          else{
            q.push("c=" + this.state.historyQuery.contact);
          }

        }
        var accQuery = '', conQuery = '';
        if(this.state.historyQuery.account){
          if(this.state.historyQuery.account instanceof Array){
            accQuery = this.state.historyQuery.account.join(" ");
          }
          else{
            accQuery = this.state.historyQuery.account;
          }
        }
        if(this.state.historyQuery.contact){
          if(this.state.historyQuery.contact instanceof Array){
            conQuery = this.state.historyQuery.contact.join(" ");
          }
          else{
            conQuery = this.state.historyQuery.contact;
          }
        }

        if(query)
          historyApi.searchHistories(query,accQuery,conQuery,0,40).then(()=>{
            if(q.length > 0)
              this.context.router.push('/histories?q=' + query + "&" + q.join("&"));
            else
              this.context.router.push('/histories?q=' + query);
          });
        else{
          historyApi.searchHistories('',accQuery,conQuery,0, 40).then(()=>{
            if(q.length > 0)
              this.context.router.push('/histories?' + q.join("&"));
            else
              this.context.router.push('/histories');
          });
        }
      }
    }
  }

  componentWillReceiveProps(props){
      let query = props.location.query.q;
      var a = this.state.historyQuery.account,c = this.state.historyQuery.contact;
      if(query)
        query = query;
      else
        query = '';
      if (props.searchType === 'tickets') {
        if(query)
          ticketApi.searchTickets(query,0,40);
        else
          ticketApi.getTickets(0, 40);
      }
      if (props.searchType === 'accounts') {
        if(query)
          accountApi.searchAccounts(query,0,40);
        else
          accountApi.getAccounts(0, 40);
      }
      if (props.searchType === 'contacts') {
        if(query)
          contactApi.searchContacts(query,0,40);
        else
          contactApi.getContacts(0, 40);
      }
      if (props.searchType === 'blogs') {
        if(query)
          blogApi.searchBlogs(query,0,40);
        else
          blogApi.getBlogs(0, 40);
      }
      if (props.searchType === 'histories') {
        var exParams = [];
        if(props.location.query.a){
          exParams.push(props.location.query.a);
          a = props.location.query.a;
        }
        if(props.location.query.c){
          exParams.push(props.location.query.c);
          c = props.location.query.c;
        }
        var accQuery = '',conQuery = '';
        if(props.location.query.a){
          if(props.location.query.a instanceof Array)
            accQuery = props.location.query.a.join(" ");
          else
            accQuery = props.location.query.a;
        }
        if(props.location.query.c){
          if(props.location.query.c instanceof Array)
            conQuery = props.location.query.c.join(" ");
          else
            conQuery = props.location.query.c;
        }


        if(query)
          historyApi.searchHistories(query,accQuery,conQuery,0,40);
        else if(exParams.length > 0)
          historyApi.searchHistories('',accQuery,conQuery,0, 40);
        else
          historyApi.getHistories(0,40);
      }
      var historyQuery = {};
      historyQuery.account = a;
      historyQuery.contact = c;
      this.setState({query:query,historyQuery:historyQuery});
  }

  componentWillMount(){
    var props = this.props;
    let query = props.location.query.q;
    var a = this.state.historyQuery.account,c = this.state.historyQuery.contact;
    if(query)
      query = query;
    else
      query = '';
    if (props.searchType === 'tickets') {
      if(query)
        ticketApi.searchTickets(query,0,40);
      else
        ticketApi.getTickets(0, 40);
    }
    if (props.searchType === 'accounts') {
      if(query)
        accountApi.searchAccounts(query,0,40);
      else
        accountApi.getAccounts(0, 40);
    }
    if (props.searchType === 'contacts') {
      if(query)
        contactApi.searchContacts(query,0,40);
      else
        contactApi.getContacts(0, 40);
    }
    if (props.searchType === 'blogs') {
      if(query)
        blogApi.searchBlogs(query,0,40);
      else
        blogApi.getBlogs(0, 40);
    }
    if (props.searchType === 'histories') {
      var exParams = [];
      if(props.location.query.a){
        exParams.push(props.location.query.a);
        a = props.location.query.a;
      }
      if(props.location.query.c){
        exParams.push(props.location.query.c);
        c = props.location.query.c;
      }
      var accQuery = '',conQuery = '';
      if(props.location.query.a){
        if(props.location.query.a instanceof Array)
          accQuery = props.location.query.a.join(" ");
        else
          accQuery = props.location.query.a;
      }
      if(props.location.query.c){
        if(props.location.query.c instanceof Array)
          conQuery = props.location.query.c.join(" ");
        else
          conQuery = props.location.query.c;
      }


      if(query)
        historyApi.searchHistories(query,accQuery,conQuery,0,40);
      else if(exParams.length > 0)
        historyApi.searchHistories('',accQuery,conQuery,0, 40);
      else
        historyApi.getHistories(0,40);
    }
    var historyQuery = {};
    historyQuery.account = a;
    historyQuery.contact = c;
    this.setState({query:query,historyQuery:historyQuery});
  }

  render(){
    return (
      <SearchForm
        search={this.searchQuery}
        searchType={this.props.searchType}
        onChangeQuery={this.onChangeQuery}
        onChangeHistoryQuery={this.onChangeHistoryQuery}
        historyQuery={this.state.historyQuery}
        query={this.state.query}
        ref="child"
        location={this.props.location}
      />
    );
  }

}

SearchFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

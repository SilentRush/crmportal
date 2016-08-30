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
        if(this.state.historyQuery.account)
          q.push("a=" + this.state.historyQuery.account);
        if(this.state.historyQuery.contact)
          q.push("c=" + this.state.historyQuery.contact);
        if(query)
          historyApi.searchHistories(query,this.state.historyQuery.account,this.state.historyQuery.contact,0,40).then(()=>{
            if(q.length > 0)
              this.context.router.push('/histories?q=' + query + "&" + q.join("&"));
            else
              this.context.router.push('/histories?q=' + query);
          });
        else{
          historyApi.searchHistories('',this.state.historyQuery.account,this.state.historyQuery.contact,0, 40).then(()=>{
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
      var state = Object.assign({}, this.state);
      if(query)
        state.query = query;
      else
        state.query = '';
      if (this.props.searchType === 'tickets') {
        if(query)
          ticketApi.searchTickets(query,0,40);
        else
          ticketApi.getTickets(0, 40);
      }
      if (this.props.searchType === 'accounts') {
        if(query)
          accountApi.searchAccounts(query,0,40);
        else
          accountApi.getAccounts(0, 40);
      }
      if (this.props.searchType === 'contacts') {
        if(query)
          contactApi.searchContacts(query,0,40);
        else
          contactApi.getContacts(0, 40);
      }
      if (this.props.searchType === 'blogs') {
        if(query)
          blogApi.searchBlogs(query,0,40);
        else
          blogApi.getBlogs(0, 40);
      }
      if (this.props.searchType === 'histories') {
        var exParams = [];
        if(props.location.query.a){
          exParams.push(props.location.query.a);
        }
        if(props.location.query.c)
          exParams.push(props.location.query.c);
        if(query)
          historyApi.searchHistories(query,props.location.query.a,props.location.query.c,0,40);
        else if(exParams.length > 0)
          historyApi.searchHistories('',props.location.query.a,props.location.query.c,0, 40);
        else
          historyApi.getHistories(0,40);
      }
      this.setState(state);
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
      />
    );
  }

}

SearchFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

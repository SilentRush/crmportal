import React from 'react';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import { loadSearchLayout } from '../../actions/search-layout-actions';
import SearchForm from '../views/SearchForm';

const SearchFormContainer = React.createClass({

  search: function(event) {
    event.preventDefault();

    // By assigning a "child" ref to <SearchForm />, we
    // can use that reference to gain access to the
    // .getQuery() method. See the code for
    // <SearchForm /> to see how it returns a value.
    let query = this.refs.child.getQuery();

    if (this.props.searchType === 'tickets') {
      if(query)
        ticketApi.searchTickets(query,0,40);
      else
        ticketApi.getTickets();
    }
    if (this.props.searchType === 'accounts') {
      accountApi.searchAccounts(query,0,40);
    }
  },

  render: function() {
    return (
      <SearchForm search={this.search} ref="child" />
    );
  }

});

export default SearchFormContainer;

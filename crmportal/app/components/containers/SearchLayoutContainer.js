import React from 'react';
import { connect } from 'react-redux';
import SearchLayout from '../layouts/SearchLayout';

const mapStateToProps = function(store) {
  let searchType = store.searchLayoutState.searchType;
  let totalResults = 0;

  if (searchType === 'tickets') {
    totalResults = store.ticketState.tickets.hits.length;
  }
  if (searchType === 'accounts') {
    totalResults = store.accountState.accounts.hits.length;
  }
  return {
    searchType,
    title: store.searchLayoutState.title,
    totalResults
  };

};

export default connect(mapStateToProps)(SearchLayout);

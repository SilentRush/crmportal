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
  if (searchType === 'contacts') {
    totalResults = store.contactState.contacts.hits.length;
  }
  if (searchType === 'blogs') {
    totalResults = store.blogState.blogs.hits.length;
  }
  if (searchType === 'histories') {
    totalResults = store.historyState.histories.hits.length;
  }
  return {
    searchType,
    title: store.searchLayoutState.title,
    totalResults
  };

};

export default connect(mapStateToProps)(SearchLayout);

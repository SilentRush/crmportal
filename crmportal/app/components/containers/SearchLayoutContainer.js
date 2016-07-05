import React from 'react';
import { connect } from 'react-redux';
import SearchLayout from '../layouts/SearchLayout';

const mapStateToProps = function(store) {
  let searchType = store.searchLayoutState.searchType;
  let totalResults = 0;

  if (searchType === 'tickets') {
    totalResults = store.ticketState.tickets.length;
  }
  return {
    searchType,
    title: store.searchLayoutState.title,
    totalResults
  };

};

export default connect(mapStateToProps)(SearchLayout);

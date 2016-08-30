import React from "react";
import { connect } from 'react-redux';
import * as historyApi from '../../api/history-api';
import store from '../../store';
import HistoryList from "../views/HistoryList";
import { loadSearchLayout } from '../../actions/search-layout-actions';

class HistoryListContainer extends React.Component{
  componentDidMount(){
    historyApi.getHistories(0, 40);
    store.dispatch(loadSearchLayout('histories', 'History Results'));
  }

  render(){
    return (
      <HistoryList histories={this.props.histories} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    histories: store.historyState.histories
  };
};

export default connect(mapStateToProps)(HistoryListContainer);

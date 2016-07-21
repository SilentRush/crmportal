import React from "react";
import { connect } from 'react-redux';
import * as accountApi from '../../api/account-api';
import store from '../../store';
import AccountList from "../views/AccountList";
import { loadSearchLayout } from '../../actions/search-layout-actions';

class AccountListContainer extends React.Component{
  componentDidMount(){
    accountApi.getAccounts(0, 40);
    store.dispatch(loadSearchLayout('accounts', 'Account Results'));
  }

  render(){
    return (
      <AccountList accounts={this.props.accounts} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    accounts: store.accountState.accounts
  };
};

export default connect(mapStateToProps)(AccountListContainer);

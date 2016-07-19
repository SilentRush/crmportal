import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import AccountDetail from "../views/AccountDetail";
import TicketMiniList from "../views/TicketMiniList";

class AccountDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showNotes: false,
      currentIndex: 0,
      clickPage: (page) => {
        let f = page * 15;
        console.log(this);
        this.setState({currentIndex: page});
        ticketApi.getAccountTickets(this.props.account.accountid,f,15);
      }
    };
    this.clickShowNotes = this.clickShowNotes.bind(this);
  }

  componentDidMount(){
      let accountId = this.props.params.accountid;
      accountApi.getAccount(accountId);
      ticketApi.getAccountTickets(accountId,0,15);
  }



  clickShowNotes(){
    if(this.state.showNotes)
      this.setState({showNotes: false})
    else
      this.setState({showNotes: true});
  }

  render(){
    return (
      <div className="row">
        <div className="col-sm-4 col-xs-12 col-md-4">
          <TicketMiniList tickets={this.props.tickets} currentIndex={this.state.currentIndex} clickPage={this.state.clickPage}  />
        </div>
        <div className="col-sm-8 col-xs-12 col-md-8">
          <AccountDetail account={this.props.account} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    account: store.accountState.account,
    tickets: store.ticketState.tickets
  };
};

export default connect(mapStateToProps)(AccountDetailContainer);

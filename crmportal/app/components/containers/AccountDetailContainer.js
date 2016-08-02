import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import AccountDetail from "../views/AccountDetail";
import TicketMiniList from "../views/TicketMiniList";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";

class AccountDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showNotes: false,
      currentIndex: 0,
      clickPage: (page) => {
        let f = page * 15;
        this.setState({currentIndex: page});
        ticketApi.getAccountTickets(this.props.account.accountid,f,15);
      }
    };
    this.clickShowNotes = this.clickShowNotes.bind(this);
  }

  componentDidMount(){
      let accountId = this.props.params.accountid;
      accountApi.getAccount(accountId).then(()=>{
        this.commentList = <CommentListContainer isEdit={false} entityid={this.props.account.accountid} type={"account"} />;
        console.log(this);
      });
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
        <div className="col-sm-3 col-xs-12 col-md-3">
          <TicketMiniList tickets={this.props.tickets} currentIndex={this.state.currentIndex} clickPage={this.state.clickPage}  />
        </div>
        <div className="col-sm-9 col-xs-12 col-md-9">
          <AccountDetail account={this.props.account} />
          {this.commentList}
          <CommentContainer isEdit={true} entityid={this.props.account.accountid} type={"account"} />
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

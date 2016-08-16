import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import TicketDetail from "../views/TicketDetail";
import AccountMiniDetail from "../views/AccountMiniDetail";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {Entity} from 'draft-js';

class TicketDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {showNotes: false};
    this.clickShowNotes = this.clickShowNotes.bind(this);
  }

  componentDidMount(){
    var data;
    let ticketId;
    if(this.props.params)
      ticketId = this.props.params.ticketid;
    ticketApi.getTicket(ticketId).then(
      () => {
        accountApi.getAccount(this.props.ticket.account.accountid);
      }
    ).then(()=>{
      this.commentList = <CommentListContainer entityid={this.props.ticket.ticketid} type={"ticket"} />;
    });
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
          <AccountMiniDetail account={this.props.account} clickShowNotes={this.clickShowNotes} showNotes={this.state.showNotes} />
        </div>
        <div className="col-sm-9 col-xs-12 col-md-9">
          <TicketDetail ticket={this.props.ticket} />
          <div className="entityDetailContainer card-shadow">
            <div className="commentsHeader">Comments</div>
            <div className="entityDetail">
              {this.commentList}
              <CommentContainer isEdit={true} entityid={this.props.ticket.ticketid} type={"ticket"} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = function(store) {
  return {
    ticket: store.ticketState.ticket,
    account: store.accountState.account
  };
};

export default connect(mapStateToProps)(TicketDetailContainer);

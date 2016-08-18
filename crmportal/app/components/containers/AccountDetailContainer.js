import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as accountApi from '../../api/account-api';
import AccountDetail from "../views/AccountDetail";
import TicketMiniList from "../views/TicketMiniList";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {ChangeValue} from "../Utility/InputUtilities";
import {addError,removeError} from "../Utility/ErrorUtilities";
import {NotificationManager} from 'react-notifications';

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
      },
      account:{
        accountid:'',
        accountname:'',
        address:{
          addressid:'',
          streetaddress:'',
          zip:'',
          city:''
        },
        notes:''
      },
      errors:{}
    };
    this.clickShowNotes = this.clickShowNotes.bind(this);
    this.changeValue = (field,value) => {
      var state = this.state;
      state = ChangeValue(state,field,value);
      if(state)
        this.setState(state, this.isValid(()=>{
          //Validity Callback
        }));
      else {
        console.error("Unable to locate path: " + field + " in state.");
      }
    }

    this.isValid = (successCallback) => {
      let nextState = Object.assign({},this.state);
      nextState = Object.assign({}, this.validateAccountName(nextState));
      this.setState(nextState,()=>{successCallback()});
    };

    this.saveAccount = () => {
      this.isValid(()=> {
        if(Object.keys(this.state.errors).length == 0){
          accountApi.updateAccount(this.state.account).then(() => {
            NotificationManager.success('Save Successful','',2500);
          });
        }
      });
    }
  }

  validateAccountName(state = 0){
    let nextState
    state ? nextState = Object.assign({},state) : nextState = Object.assign({},this.state);

    if(!nextState.account.accountname || nextState.account.accountname == ""){
      nextState = Object.assign({}, addError(nextState,"Account Name Missing", "accountname"));
    }
    else{
      nextState = Object.assign({}, removeError(nextState,"Account Name Missing", "accountname"));
    }
    return nextState;
  }

  componentDidMount(){
      let accountId = this.props.params.accountid;
      accountApi.getAccount(accountId).then(()=>{
        this.commentList = <CommentListContainer isEdit={false} entityid={this.props.account.accountid} type={"account"} />;
        this.setState({account:this.props.account});
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
          <AccountDetail account={this.state.account}
            changeValue={this.changeValue}
            saveAccount={this.saveAccount}
            errors={this.state.errors}
           />
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

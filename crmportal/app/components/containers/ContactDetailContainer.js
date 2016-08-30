import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as contactApi from '../../api/contact-api';
import ContactDetail from "../views/ContactDetail";
import TicketMiniList from "../views/TicketMiniList";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {ChangeValue} from "../Utility/InputUtilities";
import {addError,removeError} from "../Utility/ErrorUtilities";
import {NotificationManager} from 'react-notifications';

class ContactDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contact:{
        contactid:'',
        contactname:'',
        fullname:''
      },
      errors:{}
    };
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
      nextState = Object.assign({}, this.validateContactName(nextState));
      this.setState(nextState,()=>{successCallback()});
    };

    this.saveContact = () => {
      this.isValid(()=> {
        if(Object.keys(this.state.errors).length == 0){
          contactApi.updateContact(this.state.contact).then(() => {
            NotificationManager.success('Save Successful','',2500);
          });
        }
      });
    }
  }

  validateContactName(state = 0){
    let nextState
    state ? nextState = Object.assign({},state) : nextState = Object.assign({},this.state);

    if(!nextState.contact.contactname || nextState.contact.contactname == ""){
      nextState = Object.assign({}, addError(nextState,"Contact Name Missing", "contactname"));
    }
    else{
      nextState = Object.assign({}, removeError(nextState,"Contact Name Missing", "contactname"));
    }
    return nextState;
  }

  componentDidMount(){
      let contactId = this.props.params.contactid;
      contactApi.getContact(contactId).then(()=>{
        this.commentList = <CommentListContainer isEdit={false} entityid={this.props.contact.contactid} type={"contact"} />;
        this.setState({contact:this.props.contact});
      });
  }

  render(){

    return (
      <div className="row">
        <div className="col-sm-12 col-xs-12 col-md-12">
          <ContactDetail contact={this.state.contact}
            changeValue={this.changeValue}
            saveContact={this.saveContact}
            errors={this.state.errors}
           />
          {this.commentList}
          <CommentContainer isEdit={true} entityid={this.props.contact.contactid} type={"contact"} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    contact: store.contactState.contact
  };
};

export default connect(mapStateToProps)(ContactDetailContainer);

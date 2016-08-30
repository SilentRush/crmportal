import React from "react";
import { connect } from 'react-redux';
import * as ticketApi from '../../api/ticket-api';
import * as historyApi from '../../api/history-api';
import HistoryDetail from "../views/HistoryDetail";
import TicketMiniList from "../views/TicketMiniList";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {ChangeValue} from "../Utility/InputUtilities";
import {addError,removeError} from "../Utility/ErrorUtilities";
import {NotificationManager} from 'react-notifications';

class HistoryDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showNotes: false,
      currentIndex: 0,
      history:{
        historyid:'',
        historyname:'',
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
      nextState = Object.assign({}, this.validateNotes(nextState));
      this.setState(nextState,()=>{successCallback()});
    };

    this.saveHistory = () => {
      this.isValid(()=> {
        if(Object.keys(this.state.errors).length == 0){
          historyApi.updateHistory(this.state.history).then(() => {
            NotificationManager.success('Save Successful','',2500);
          });
        }
      });
    }
  }

  validateNotes(state = 0){
    let nextState
    state ? nextState = Object.assign({},state) : nextState = Object.assign({},this.state);

    if(!nextState.history.longnotes || nextState.history.longnotes == ""){
      nextState = Object.assign({}, addError(nextState,"History Notes Missing", "longnotes"));
    }
    else{
      nextState = Object.assign({}, removeError(nextState,"History Notes Missing", "longnotes"));
    }
    return nextState;
  }

  componentDidMount(){
      let historyId = this.props.params.historyid;
      historyApi.getHistory(historyId).then(()=>{
        this.commentList = <CommentListContainer isEdit={false} entityid={this.props.history.historyid} type={"history"} />;
        this.setState({history:this.props.history});
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
        <div className="col-sm-12 col-xs-12 col-md-12">
          <HistoryDetail history={this.state.history}
            changeValue={this.changeValue}
            saveHistory={this.saveHistory}
            errors={this.state.errors}
           />
          {this.commentList}
          <CommentContainer isEdit={true} entityid={this.props.history.historyid} type={"history"} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    history: store.historyState.history
  };
};

export default connect(mapStateToProps)(HistoryDetailContainer);

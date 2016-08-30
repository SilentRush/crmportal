import React from "react";
import { Link, browserHistory } from "react-router";
import {TextToInputGroup} from "../Utility/InputGroup";
import * as accountApi from '../../api/account-api';
import * as contactApi from '../../api/contact-api';
import { connect } from 'react-redux';
import {InputList} from "../Utility/InputList";


class HistorySearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {selectedAccountNames:[],accountNamesArr:[],currAccountText:'',
                  selectedContactNames:[],contactNamesArr:[],currContactText:''};
    this.onChangeHistoryQuery = (value,key) =>{
      let obj = this.props.historyQuery;
      obj[key] = value;
      this.props.onChangeHistoryQuery(obj);
    }
    this.getSelectedAccountNames = (value) => {
      let selectedAccountNames = this.props.accountnames.filter((name)=>{
          return name.toUpperCase().indexOf(value.toUpperCase()) !== -1
      });
      this.setState({selectedAccountNames:selectedAccountNames.slice(0,50),currAccountText:value});
    }
    this.onClickAccountName = (name) => {
      return (<li key={name} onClick={(e)=>{this.changeAccount(name);}}><a>{name}</a></li>);
    }
    this.changeAccount = (name) => {
        var arr = this.state.accountNamesArr;
        arr.push(name);
        this.setState({accountNamesArr:arr,selectedAccountNames:[],currAccountText:''}, ()=>{this.onChangeHistoryQuery(this.state.accountNamesArr.join(" "),"account");});
    }
    this.updateAccountList = (value) => {
      this.setState({accountNamesArr:value}, ()=>{this.onChangeHistoryQuery(this.state.accountNamesArr.join(" "),"account");});
    }

    this.getSelectedContactNames = (value) => {
      let selectedContactNames = this.props.contactnames.filter((name)=>{
          return name.toUpperCase().indexOf(value.toUpperCase()) !== -1
      });
      this.setState({selectedContactNames:selectedContactNames.slice(0,50),currContactText:value});
    }
    this.onClickContactName = (name) => {
      return (<li key={name} onClick={(e)=>{this.changeContact(name);}}><a>{name}</a></li>);
    }
    this.changeContact = (name) => {
        var arr = this.state.contactNamesArr;
        arr.push(name);
        this.setState({contactNamesArr:arr,selectedContactNames:[],currContactText:''}, ()=>{this.onChangeHistoryQuery(this.state.contactNamesArr.join(" "),"contact");});
    }
    this.updateContactList = (value) => {
      this.setState({contactNamesArr:value}, ()=>{this.onChangeHistoryQuery(this.state.contactNamesArr.join(" "),"contact");});
    }


  }
  componentDidMount(){
    if(this.props.accountnames.length < 1){
      accountApi.getAccountNames();
      contactApi.getContactNames();
    }
  }
  render(){
    return(
      <div>
        <form onSubmit={this.props.search} className="search">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" value={this.props.query} onChange={this.props.onChangeQuery} />
            <span className="input-group-btn">
              <input type="submit" className="btn btn-default" value="Search" />
            </span>
          </div>
        </form>
        <div className="row">
          <div className="col-sm-6 col-xs-6 col-md-6">
              <InputList
                onChangeInput={this.getSelectedAccountNames}
                inputValue={this.state.currAccountText}
                placeholder="Account"
                list={this.state.accountNamesArr}
                updateList={this.updateAccountList}
                key="account"
              />
              <ul className="results">
                {this.state.selectedAccountNames.map(this.onClickAccountName)}
              </ul>
          </div>
          <div className="col-sm-6 col-xs-6 col-md-6">
            <InputList
              onChangeInput={this.getSelectedContactNames}
              inputValue={this.state.currContactText}
              placeholder="Contact"
              list={this.state.contactNamesArr}
              updateList={this.updateContactList}
              key="contact"
            />
            <ul className="results">
              {this.state.selectedContactNames.map(this.onClickContactName)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    accountnames: store.accountState.accountnames,
    contactnames: store.contactState.contactnames
  };
};

export default connect(mapStateToProps)(HistorySearchForm);

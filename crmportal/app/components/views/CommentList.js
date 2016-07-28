import React from "react";
import { Link } from "react-router";
import CommentContainer from "../containers/CommentContainer";
import {genKey} from "draft-js";

export default class CommentList extends React.Component{
  constructor(props){
    super();
    console.log(this.props);
    this.createListItem = (comment) => this._createListItem(comment);
  }
  _createListItem(comment){
    return (
      <div key={genKey()}>
        <CommentContainer comment={comment} isEdit={this.props.isEdit} />
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.comments.map(this.createListItem)}
      </div>
    )
  }
}

import React from "react";
import { Link } from "react-router";
import CommentContainer from "../containers/CommentContainer";
import {genKey} from "draft-js";

export default class CommentList extends React.Component{
  constructor(props){
    super();
    this.createListItem = (comment) => this._createListItem(comment);
  }
  render(){
    return(
      <div>
        {this.props.comments.hits.map((comment) => {
          console.log("comment List");
          console.log(comment);
          return <ListItemWrapper key={genKey()} comment={comment} isEdit={this.props.isEdit} />
        })}
      </div>
    )
  }
}

var ListItemWrapper = React.createClass({
  render: function() {
    return (
      <div>
        <CommentContainer comment={this.props.comment} commentid={this.props.comment._id} isEdit={this.props.isEdit} />
      </div>
    )
  }
});

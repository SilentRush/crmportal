import React from "react";
import { connect } from 'react-redux';
import Comment from "../views/Comment";
import * as commentApi from '../../api/comment-api';

export default class CommentContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {showComment:true};
    this.submitComment = (comment) => this._submitComment(comment);
    this.toggleComment = () => {
      if(this.state.showComment)
        this.setState({showComment:false});
      else
        this.setState({showComment:true});
    }
  }
  _submitComment(comment){
    let commentObj = {
      rawbody: comment,
      type: this.props.type,
      entityid: this.props.entityid
    }
    commentApi.addComment(commentObj);
  }

  render(){
    return (
      <Comment comment={this.props.comment} isEdit={this.props.isEdit} submitComment={this.submitComment} showComment={this.state.showComment} toggleComment={this.toggleComment} />
    )
  }
}

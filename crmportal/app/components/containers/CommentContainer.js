import React from "react";
import { connect } from 'react-redux';
import Comment from "../views/Comment";
import * as commentApi from '../../api/comment-api';
import * as userApi from '../../api/user-api';

class CommentContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {showComment:true,isEdit:props.isEdit,isUpdate:props.isUpdate};
    this.submitComment = (comment) => this._submitComment(comment);
    this.updateComment = (comment) => this._updateComment(comment);
    this.toggleComment = (e) => {
      if(e.target.className.indexOf("glyphicon") === -1){
        if(this.state.showComment)
          this.setState({showComment:false});
        else
          this.setState({showComment:true});
      }

    }
    this.edit = (e) => {
      e.preventDefault();
      if(this.state.isEdit)
        this.setState({isEdit:false});
      else
        this.setState({isEdit:true});
    }
    this.delete = () => {
      commentApi.deleteComment(this.props.comment._id);
    }
  }

  componentDidMount(){
      console.log(this.props.comment);
      if(this.props.comment)
        userApi.getUser(this.props.comment._source.userid);

  }

  _submitComment(comment){
    let commentObj = {
      rawbody: comment.rawbody,
      body: comment.body,
      type: this.props.type,
      entityid: this.props.entityid
    }
    commentApi.addComment(commentObj);
  }

  _updateComment(comment){
    let commentObj = {
      rawbody: comment.rawbody,
      body: comment.body,
      commentid: this.props.comment._id
    }
    commentApi.updateComment(commentObj);
    this.setState({isEdit:false});
  }

  render(){
    return (
      <Comment user={this.props.user} comment={this.props.comment} isEdit={this.state.isEdit} isUpdate={this.state.isUpdate} edit={this.edit} delete={this.delete} submitComment={this.submitComment} updateComment={this.updateComment} showComment={this.state.showComment} toggleComment={this.toggleComment} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(CommentContainer);

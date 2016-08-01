import React from "react";
import { connect } from 'react-redux';
import * as commentApi from '../../api/comment-api';
import store from '../../store';
import CommentList from '../views/CommentList';

class CommentListContainer extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    if(this.props.entityid)
      commentApi.getComments(this.props.type,this.props.entityid,0, 40);
  }

  render(){
    return (
      <CommentList comments={this.props.comments} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    comments: store.commentState.comments
  };
};

export default connect(mapStateToProps)(CommentListContainer);

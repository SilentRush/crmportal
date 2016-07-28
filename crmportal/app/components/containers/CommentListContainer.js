import React from "react";
import { connect } from 'react-redux';
import CommentList from '../views/CommentList';

class CommentListContainer extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return (
      <CommentList comments={this.props.comments} isEdit={this.props.isEdit} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
  };
};

export default connect(mapStateToProps)(CommentListContainer);

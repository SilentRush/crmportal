import React from "react";
import { connect } from 'react-redux';
import Comment from "../views/Comment";

class CommentContainer extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props);
  }

  handleSubmit(body){
  }

  render(){
    return (
      <Comment comment={this.props.comment} isEdit={this.props.isEdit} content={this.props.comment} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
  };
};

export default connect(mapStateToProps)(CommentContainer);

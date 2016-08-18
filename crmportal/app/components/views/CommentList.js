import React from "react";
import { Link } from "react-router";
import CommentContainer from "../containers/CommentContainer";
import {genKey} from "draft-js";

export default class CommentList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var comments = this.props.comments.hits.map((comment) => {
      return (
        <CommentContainer comment={comment} commentid={comment._id} isEdit={false} isUpdate={true} key={comment._id} />
      );
    });
    return(
      <div>
          {comments}
      </div>
    );
  }
}

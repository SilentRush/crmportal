import React from "react";
import TextEditor from "../Utility/TextEditor";


export default class Comment extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var textEditor, commentDetails, comment;
    if(this.props.comment){
      const {createdate} = this.props.comment._source;
      let Createdate = new Date(createdate);
      textEditor =
      <span><TextEditor isEdit={this.props.isEdit} content={this.props.comment._source.rawbody} submitComment={this.props.submitComment} /></span>;
      commentDetails =
      <span>Posted on: {Createdate.toLocaleString()}</span>
    }
    else{
      textEditor = <span><TextEditor isEdit={this.props.isEdit} submitComment={this.props.submitComment} /></span>;
    }

    if(this.props.showComment)
      comment = textEditor;

    return (
      <div className="commentContainer">
        <div className="commentHeader" onClick={this.props.toggleComment}>Comment</div>
        <div className="editor">
          {comment}
        </div>
        <div className="commentDetails">
          {commentDetails}
        </div>
      </div>
    )
  }
}

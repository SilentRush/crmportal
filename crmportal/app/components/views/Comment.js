import React from "react";
import TextEditor from "../Utility/TextEditor";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Link} from "react-router";


export default class Comment extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    var textEditor, commentDetails, comment, editBtn, delBtn, header = "New Comment";
    if(this.props.comment){
      const {createdate,userid,updatedate} = this.props.comment._source;
      const {firstname, lastname} = this.props.user._source;
      header = <span>Posted By: <Link to={"/users/" + userid}>{firstname + " " + lastname}</Link></span>;
      let Createdate = new Date(createdate);
      let Updatedate = new Date(updatedate);
      if(localStorage.userid == userid){
        editBtn = <span className="glyphicon glyphicon-edit" onClick={this.props.edit}></span>;
        delBtn = <span className="glyphicon glyphicon-trash" style={{marginLeft:"10px"}} onClick={this.props.delete}></span>;
      }
      textEditor =
      <div><TextEditor isEdit={this.props.isEdit} isUpdate={this.props.isUpdate} content={this.props.comment._source.rawbody} submitComment={this.props.submitComment} updateComment={this.props.updateComment} /></div>;
      commentDetails =
      <span>Posted on: {Createdate.toLocaleString()}  -  Updated at: {Updatedate.toLocaleString()}</span>
    }
    else{
      textEditor = <div><TextEditor isEdit={this.props.isEdit} submitComment={this.props.submitComment} updateComment={this.props.updateComment} /></div>;
    }

    if(this.props.showComment)
      comment = textEditor;

    return (
      <div className="commentContainer">
        <div className="commentHeader" onClick={this.props.toggleComment}><span>{header}</span><div style={{float:"right", fontSize:"18px"}}>{editBtn}{delBtn}</div></div>
        <div className="editor">
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {comment}
          </ReactCSSTransitionGroup>
        </div>
        <div className="commentDetails">
          {commentDetails}
        </div>
      </div>
    )
  }
}

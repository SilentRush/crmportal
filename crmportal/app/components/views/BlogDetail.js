import React from "react";
import TextEditor from "../Utility/TextEditor";


export default class BlogDetail extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    var textEditor, blogDetails, blog
    if(this.props.blog){
      const {createdate,userid,updatedate} = this.props.blog._source;
      let Createdate = new Date(createdate);
      let Updatedate = new Date(updatedate);
      if(localStorage.userid == userid){
        var editBtn = <button className="btn btn-default" onClick={this.props.edit}>Edit</button>;
        var delBtn = <button className="btn btn-danger" onClick={this.props.delete}>Delete</button>;
      }
      textEditor =
      <span><TextEditor isEdit={this.props.isEdit} isUpdate={this.props.isUpdate} content={this.props.comment._source.rawbody} submitComment={this.props.submitComment} updateComment={this.props.updateComment} />{editBtn}{delBtn}</span>;
      blogDetails =
      <span>Posted on: {Createdate.toLocaleString()}  -  Updated at: {Updatedate.toLocaleString()}</span>
    }
    else{
      textEditor = <span><TextEditor isEdit={this.props.isEdit} submitComment={this.props.submitComment} updateComment={this.props.updateComment} /></span>;
    }

    if(this.props.showComment)
      blog = textEditor;

    return (
      <div className="commentContainer">
        <div className="commentHeader" onClick={this.props.toggleComment}>Test</div>
        <div className="editor">
          {blog}
        </div>
        <div className="commentDetails">
          {blogDetails}
        </div>
      </div>
    )
  }
}

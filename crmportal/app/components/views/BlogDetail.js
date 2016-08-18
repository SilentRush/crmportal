import React from "react";
import { Link, browserHistory } from "react-router";
import TextEditor from "../Utility/TextEditor";
import {TextToInputGroup} from "../Utility/InputGroup";


export default class BlogDetail extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var textEditor, blogDetails, blog, thumbnailImg,editBtn,delBtn
    const {title, thumbnail, rawbody, body, createdate,userid,updatedate} = this.props.blog._source;
    const {firstname,lastname} = this.props.user._source;
    let Createdate = new Date(createdate);
    let Updatedate = new Date(updatedate);
    if(this.props.blog._source.body)
      textEditor =<span key={this.props.blog._id}><TextEditor isEdit={false} content={rawbody} /></span>;
    else
      textEditor = '';
    blogDetails =
    <span>Posted on: {Createdate.toLocaleString()}  -  Updated at: {Updatedate.toLocaleString()}</span>

    if(this.props.blog._source.thumbnail)
      thumbnailImg = <img src={thumbnail} onError={(e)=>{e.target.src = '';}} style={{margin:"auto",display:"block"}} />

    if(localStorage.userid == userid){
      editBtn = <Link to="/update/blog" params={{blogid:this.props.blog._id}}><span className="glyphicon glyphicon-edit"></span></Link>;
      delBtn = <span className="glyphicon glyphicon-trash" style={{marginLeft:"10px"}} onClick={this.props.delete}></span>;
    }

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader" onClick={this.props.toggleComment} style={{fontSize:"2em"}}><span>{title}</span><div style={{float:"right", fontSize:"18px",marginTop:"10px"}}>{editBtn}{delBtn}</div></div>
        {thumbnailImg}
        <div className="editor">
          {textEditor}
        </div>
        <div className="entityDetail">
          {blogDetails}
          <div>{firstname + " " + lastname}</div>
        </div>
      </div>
    )
  }
}

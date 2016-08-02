import React from "react";
import TextEditor from "../Utility/TextEditor";


export default class BlogDetail extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    var textEditor, blogDetails, blog, thumbnailImg
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
      thumbnailImg = <img src={thumbnail} onError={(e)=>{e.target.src = '';}} />

    return (
      <div className="entityDetailContainer card-shadow">
        <div className="entityDetailHeader" onClick={this.props.toggleComment} style={{fontSize:"2em"}}>{title}</div>
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

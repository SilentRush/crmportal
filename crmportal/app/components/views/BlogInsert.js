import React from "react";
import TextEditor from "../Utility/TextEditor";
import {ErrorBox} from "../Utility/ErrorUtilities";


export default class BlogInsert extends React.Component{
  constructor(props){
    super(props);
    this.submitBlog = () => {
      this._submitBlog();
    }

    this.changeThumbnail = (e) => {
      this._changeThumbnail(e);
    }
  }

  _submitBlog () {
    this.props.submitBlog();
  }

  _changeThumbnail(e){
    this.props.changeThumbnail(e.target.value);
  }

  render(){
    if(this.props.errors.title)
      var titleError = ErrorBox(this.props.errors.title);
    if(this.props.errors.thumbnail)
      var thumbnailError = ErrorBox(this.props.errors.thumbnail);

    var textEditor
      textEditor = <span><TextEditor
                            isEdit={this.props.isEdit}
                            submitComment={this.props.submitComment}
                            updateComment={this.props.updateComment}
                            changeBody={this.props.changeBody}
                          /></span>;
    if(this.props.thumbnail != "")
      var thumbnail = <img ref="thumbnailImg" className="thumbnailImg" src={this.props.thumbnail}></img>
    return (
      <div className="blogContainer">
        <h1>{this.props.headerTitle}</h1>
        <div style={{marginBottom:"10px"}}>
          <div className="row">
            <div className="col-sm-6 col-xs-12 col-md-6">
              <div className="input-group" ref="titleGroup">
                <span className="input-group-addon">Title: </span>
                <input type="text" value={this.props.title} onChange={this.props.changeTitle} className="form-control" ref="title" />
              </div>
              {titleError}
            </div>
            <div className="col-sm-6 col-xs-12 col-md-6">
              <div className="input-group" ref="thumbnailGroup">
                <span className="input-group-addon">Thumbnail</span>
                <input type="text" onChange={this.changeThumbnail} className="form-control" ref="thumbnail" />
                {thumbnail}
              </div>
              {thumbnailError}
            </div>
          </div>

          <div className="input-group">
            <span className="input-group-addon">Body</span>
            {textEditor}
          </div>
        </div>

        <input type="submit" className="btn btn-primary" value="Submit Blog" onClick={this.submitBlog} />
      </div>
    )
  }
}

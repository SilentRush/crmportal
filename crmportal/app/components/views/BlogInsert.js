import React from "react";
import TextEditor from "../Utility/TextEditor";


export default class BlogInsert extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    var textEditor
      textEditor = <span><TextEditor
                            isEdit={this.props.isEdit}
                            submitComment={this.props.submitComment}
                            updateComment={this.props.updateComment}
                            changeBody={this.props.changeBody}
                          /></span>;

    return (
      <div className="blogContainer">
        <h1>Create a New Blog</h1>
        <div style={{marginBottom:"10px"}}>
          <div className="row">
            <div className="col-sm-6 col-xs-12 col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Title: </span>
                <input type="text" value={this.props.title} onChange={this.props.changeTitle} className="form-control" />
              </div>
            </div>
            <div className="col-sm-6 col-xs-12 col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Thumbnail</span>
                <input type="text" value={this.props.thumbnail} onChange={this.props.changeThumbnail} className="form-control" />
              </div>
            </div>
          </div>

          <div className="input-group">
            <span className="input-group-addon">Body</span>
            {textEditor}
          </div>
        </div>

        <input type="submit" className="btn btn-primary" value="Submit Blog" onClick={this.props.submitBlog} />
      </div>
    )
  }
}

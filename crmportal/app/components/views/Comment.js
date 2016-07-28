import React from "react";
import TextEditor from "../Utility/TextEditor"

export default class Comment extends React.Component{
  constructor(props){
    super();
  }
  render(){
    var textEditor;
    if(this.props.isEdit){
      textEditor =
      <span>
        <TextEditor isEdit={this.props.isEdit} content={this.props.comment} />
        <input type="button" value="submit" />
      </span>;
    }
    else{
      textEditor = <TextEditor isEdit={this.props.isEdit} content={this.props.content} />;
    }


    return (
      <span>
        {textEditor}
      </span>
    )
  }
}

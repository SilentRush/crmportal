import React from "react";
import {ErrorBox} from "../Utility/ErrorUtilities";

export class TextToInputGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {showInput:props.showInput};
    this.toggleInput = () => {
      if(this.state.showInput)
        this.setState({showInput:false});
      else
        this.setState({showInput:true});
    }
  }

  render (){
    var inputGroup, error,input;
    if(this.props.errors)
      error = ErrorBox(this.props.errors);
    if(this.props.useTextArea)
      input = <textarea type="text" value={this.props.value} rows="10" onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput}></textarea>
    else
      input = <input type="text" value={this.props.value} onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput} />
    if(this.state.showInput){
      inputGroup = (
        <div>
          <div className="input-group">
            <span className="input-group-addon">{this.props.label}</span>
            {input}
          </div>
          {error}
        </div>
      );
    }
    else{
      if(this.props.showLabel)
        var label = <label>{this.props.label}</label>;
      inputGroup = (
        <span onClick={this.toggleInput}>
          {label}
          <p>{this.props.value}</p>
        </span>
      );
    }

    return(
      <div>
        {inputGroup}
      </div>
    );
  }
}


export class InputGroup extends React.Component{
  constructor(props){
    super(props);
  }

  render (){
    var error, input;
    if(this.props.errors)
      error = ErrorBox(this.props.errors);
    if(this.props.useTextArea)
      input = <textarea type="text" value={this.props.value} rows="10" onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput}></textarea>
    else
      input = <input type="text" value={this.props.value} onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput} />

    return(
      <div>
        <div className="input-group">
          <span className="input-group-addon">{this.props.label}</span>
          {input}
        </div>
        {error}
      </div>
    );
  }
}

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
    var inputGroup, error,input, value;
    if(!this.props.value)
      value = '';
    else
      value = this.props.value;
    if(this.props.errors)
      error = ErrorBox(this.props.errors);
    if(this.props.useTextArea)
      input = <textarea type="text" value={value} readOnly={this.props.readOnly} rows={this.props.rows} onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput}></textarea>
    else
      input = <input type="text" value={value} readOnly={this.props.readOnly} onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput} />
    if(this.state.showInput){
      inputGroup = (
        <span>
          <div className="input-group">
            <span className="input-group-addon">{this.props.label}</span>
            {input}
          </div>
          {error}
        </span>
      );
    }
    else{
      if(value == '')
        value = 'PLACEHOLDER';
      if(this.props.showLabel)
        var label = <label>{this.props.label}</label>;
      inputGroup = (
        <span>
          <span onClick={this.toggleInput}>
            {label}
            {value}
          </span>
          {error}
        </span>
      );
    }

    return(
      <span>
        {inputGroup}
      </span>
    );
  }
}


export class InputGroup extends React.Component{
  constructor(props){
    super(props);
  }

  render (){
    var error, input,value;
    if(!this.props.value)
      value = '';
    else
      value = this.props.value;
    if(this.props.errors)
      error = ErrorBox(this.props.errors);
    if(this.props.useTextArea)
      input = <textarea type="text" value={value} readOnly={this.props.readOnly} rows={this.props.rows} onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput}></textarea>
    else
      input = <input type="text" value={value} readOnly={this.props.readOnly} onChange={this.props.onChange} className={"form-control " + this.props.classes} onBlur={this.toggleInput} />

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

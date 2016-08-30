import React from "react";

export class InputList extends React.Component{
  constructor(props){
    super(props);
    this.removeItem = (item) => {
      var arr = this.props.list;
      var index = arr.indexOf(item);
      arr.splice(index, 1);
      this.props.updateList(arr);
    }
  }

  render (){
    return(
      <div className="tagInput">
        {this.props.list.map((item)=>{
          return (<span key={item} className="tagStyle">{item} <span className="deleteTag" onClick={()=>{this.removeItem(item)}}>x</span></span>);
        })}
        <input type="text" className="" placeholder={this.props.placeholder} value={this.props.inputValue} onChange={(e)=>{this.props.onChangeInput(e.target.value)}} />
      </div>
    );
  }
}

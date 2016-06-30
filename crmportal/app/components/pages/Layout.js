import React from "react";
import Nav from "../layout/Nav";
import Footer from "../layout/Footer";


export default class Layout extends React.Component{
  render(){
    return (
      <div>
        <Nav />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

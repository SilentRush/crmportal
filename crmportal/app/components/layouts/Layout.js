import React from "react";
import {Link} from "react-router";

import Nav from "./Nav";
import Footer from "./Footer";


export default class Layout extends React.Component{
  render(){
    const { location } = this.props;
    const containerStyle = {marginTop: "60px"};
    return (
      <div>
        <Nav location={location} />
        <div className="container" style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
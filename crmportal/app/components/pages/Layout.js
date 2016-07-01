import React from "react";
import {Link} from "react-router";

import Nav from "../layout/Nav";
import Footer from "../layout/Footer";


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

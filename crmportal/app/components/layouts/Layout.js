import React from "react";
import {Link, browserHistory} from "react-router";

import Nav from "./Nav";
import Footer from "./Footer";


export default class Layout extends React.Component{
  constructor(props){
    super(props);
    if(!localStorage.userid || !localStorage.token)
      this.props.history.push('/login');
  }
  render(){
    const { location } = this.props;
    const containerStyle = {marginTop: "60px",marginBottom: "40px"};
    return (
      <div>
        <Nav location={location} />
        <div className="container-fluid" style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

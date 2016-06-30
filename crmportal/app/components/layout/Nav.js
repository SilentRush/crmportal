import React from "react";
import {Link} from "react-router";

export default class Nav extends React.Component{
  render(){
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span>
              </button> <a className="navbar-brand" href="#">Xtivia CRM Portal</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="tickets">Tickets</Link></li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

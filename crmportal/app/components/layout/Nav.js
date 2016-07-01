import React from "react";
import {Link, IndexLink} from "react-router";

export default class Nav extends React.Component{
  constructor (){
    super();
  }
  render(){
    const { location } = this.props;
    const homeClass = location.pathname === "/" ? "active" : "";
    const ticketsClass = location.pathname.match(/^\/tickets/) ? "active" : "";

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span>
              </button> <Link to="/" className="navbar-brand">Xtivia CRM Portal</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
              <ul className="nav navbar-nav">
                <li className={homeClass}><IndexLink to="/">Home</IndexLink></li>
                <li className={ticketsClass}><Link to="tickets">Tickets</Link></li>
              </ul>
              <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
            </div>
          </div>
        </nav>
    );
  }
}

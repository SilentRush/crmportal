import React from "react";
import {Link, IndexLink, browserHistory} from "react-router";

export default class Nav extends React.Component{
  constructor (){
    super();
    this.logout = () => {
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      this.props.history.push('/login');
    };
  }
  render(){
    const { location } = this.props;
    const homeClass = location.pathname === "/" ? "active" : "";
    const ticketsClass = location.pathname.match(/^\/tickets/) ? "active" : "";
    const accountsClass = location.pathname.match(/^\/accounts/) ? "active" : "";
    const blogsClass = location.pathname.match(/^\/blogs/) ? "active" : "";

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span>
              </button> <IndexLink to="/" className="navbar-brand">Xtivia CRM Portal</IndexLink>
            </div>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Support <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li className={ticketsClass}><Link to="tickets">Tickets</Link></li>
                      <li className={accountsClass}><Link to="accounts">Accounts</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Development <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li className={ticketsClass}><Link to="tickets">Tickets</Link></li>
                      <li className={accountsClass}><Link to="accounts">Accounts</Link></li>
                    </ul>
                </li>
                <li className={blogsClass}><Link to="blogs">Blogs</Link></li>
              </ul>
              <form role="search" className="navbar-form navbar-right">
                  <div className="form-group">
                      <input type="text" placeholder="Search" className="form-control" />
                  </div>
                  <button className="btn btn-danger" onClick={this.logout}><span className="glyphicon glyphicon-log-out">Logout</span></button>
              </form>
            </div>
          </div>
        </nav>
    );
  }
}

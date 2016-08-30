import React from "react";
import {Link, IndexLink, browserHistory, router} from "react-router";
import {Logout} from '../Utility/Logout';

export default class Nav extends React.Component{
  constructor (props,context){
    super(props);
    this.logout = () => {
      Logout();
      this.context.router.push('/login');
    };
  }
  render(){
    const { location } = this.props;
    const homeClass = location.pathname === "/" ? "active" : "";
    const ticketsClass = location.pathname.match(/^\/tickets/) ? "active" : "";
    const accountsClass = location.pathname.match(/^\/accounts/) ? "active" : "";
    const contactsClass = location.pathname.match(/^\/contacts/) ? "active" : "";
    const historyClass = location.pathname.match(/^\/histories/) ? "active" : "";
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
                      <li className={ticketsClass}><Link to="/tickets">Tickets</Link></li>
                      <li className={accountsClass}><Link to="/accounts">Accounts</Link></li>
                      <li className={contactsClass}><Link to="/contacts">Contacts</Link></li>
                      <li className={historyClass}><Link to="/histories">Notes History</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Development <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                      <li className={ticketsClass}><Link to="/tickets">Projects</Link></li>
                      <li className={accountsClass}><Link to="/accounts">Tasks</Link></li>
                    </ul>
                </li>
                <li className={blogsClass}><Link to="/blogs">Blogs</Link></li>
              </ul>
              <form role="search" className="navbar-form navbar-right">
                  <div className="form-group">
                      <input type="text" placeholder="Search" className="form-control" readOnly="true" />
                  </div>
                  <button className="btn btn-danger" onClick={this.logout}><span className="glyphicon glyphicon-log-out">Logout</span></button>
              </form>
            </div>
          </div>
        </nav>
    );
  }
}

Nav.contextTypes = {
  router: React.PropTypes.object.isRequired
};

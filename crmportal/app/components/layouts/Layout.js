import React from "react";
import {Link, browserHistory} from "react-router";
import { connect } from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import Nav from "./Nav";
import Footer from "./Footer";
import * as userApi from '../../api/user-api';


class Layout extends React.Component{
  constructor(props,context){
    super(props);
  }

  componentDidMount(){
      userApi.getUsers(0, 500);
  }

  render(){
    const { location } = this.props;
    const containerStyle = {marginTop: "60px",marginBottom: "40px"};
    if(!localStorage.userid || !localStorage.token)
      this.context.router.push('/login');
    return (
      <div>
        <Nav location={location} />
        <div className="container-fluid" style={containerStyle}>
          {this.props.children}
        </div>
        <NotificationContainer />
      </div>
    )
  }
}

Layout.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = function(store) {
  return {
    users: store.userState.users
  };
};

export default connect(mapStateToProps)(Layout);

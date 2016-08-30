import React from "react";
import { connect } from 'react-redux';
import * as contactApi from '../../api/contact-api';
import store from '../../store';
import ContactList from "../views/ContactList";
import { loadSearchLayout } from '../../actions/search-layout-actions';

class ContactListContainer extends React.Component{
  componentDidMount(){
    contactApi.getContacts(0, 40);
    store.dispatch(loadSearchLayout('contacts', 'Contact Results'));
  }

  render(){
    return (
      <ContactList contacts={this.props.contacts} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    contacts: store.contactState.contacts
  };
};

export default connect(mapStateToProps)(ContactListContainer);

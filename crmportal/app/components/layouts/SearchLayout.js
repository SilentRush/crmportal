import React from "react";
import {Link} from "react-router";
import SearchFormContainer from '../containers/SearchFormContainer';



export default class SearchLayout extends React.Component{
  render(){
    return (
      <div className="searchLayout">
        <header className="search-header">
          <h1>{this.props.title}</h1>
          <SearchFormContainer searchType={this.props.searchType} location={this.props.location} />
        </header>
        <div className="search-results">
          {this.props.children}
        </div>
        <footer className="search-footer">
          {this.props.totalResults} Results
        </footer>
      </div>
    )
  }
}

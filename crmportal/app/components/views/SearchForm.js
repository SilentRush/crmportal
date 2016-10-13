import React from 'react';
import HistorySearchForm from './HistorySearchForm';

export default class extends React.Component{

  constructor(props){
    super(props);
    this.onChangeQuery = (value) => {
      this.props.onChangeQuery(value);
    }
  }

  getSearchForm(){
    if(this.props.searchType == "histories"){
      return (
        <HistorySearchForm
          onChangeQuery={this.onChangeQuery}
          query={this.props.query}
          onChangeHistoryQuery={this.props.onChangeHistoryQuery}
          historyQuery={this.props.historyQuery}
          search={this.props.search}
          location={this.props.location}
        />
      );
    }
    else {
      return (
        <form onSubmit={this.props.search} className="search">
          <div className="input-group">
            <input type="text" className="form-control" ref="search" placeholder="Search" value={this.props.query} onChange={(e)=>{this.onChangeQuery(e.target.value)}} />
            <span className="input-group-btn">
              <input type="submit" className="btn btn-default" value="Search" />
            </span>
          </div>
        </form>
      );
    }
  }

  render() {
    return (<div>{this.getSearchForm()}</div>);
  }

}

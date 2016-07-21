import React from 'react';

export default React.createClass({

  getQuery: function() {
    return this.refs.search.value;
  },

  render: function() {
    return (
      <form onSubmit={this.props.search} className="search">
        <div className="input-group">
          <input type="text" className="form-control" ref="search" placeholder="Search" />
          <span className="input-group-btn">
            <input type="submit" className="btn btn-default" value="Search" />
          </span>
        </div>
      </form>
    );
  }

});

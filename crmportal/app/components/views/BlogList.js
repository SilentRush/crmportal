import React from "react";
import { Link, browserHistory } from "react-router";

export default class BlogList extends React.Component{
  constructor(props){
    super();

  }
  createListItem(blog){
    const { title, thumbnail } = blog._source;

    return (
      <div key={blog._id} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"blogs/" +blog._id}>{title}</Link></div>
          <img src={thumbnail} onError={(e)=>{e.target.src = '';}}></img>
        </div>
      </div>
    )
  }
  render(){
    console.log(this.props);
    return(
      <div>
        <input type="button" className="btn btn-success" value="Create a Blog" onClick={()=>{this.props.history.push('insert/blog')}} />
        <div className="row">
          <div className="col-sm-4 col-xs-12 col-md-4">
            {this.props.blogs1.map(this.createListItem)}
          </div>
          <div className="col-sm-4 col-xs-12 col-md-4">
            {this.props.blogs2.map(this.createListItem)}
          </div>
          <div className="col-sm-4 col-xs-12 col-md-4">
            {this.props.blogs3.map(this.createListItem)}
          </div>
        </div>
      </div>
    )
  }
}

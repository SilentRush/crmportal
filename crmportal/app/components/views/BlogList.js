import React from "react";
import { Link } from "react-router";

export default class BlogList extends React.Component{
  constructor(props){
    super();
  }
  createListItem(blog){
    const { blogid, body } = blog._source;

    return (
      <div key={blogid} className="ticketListContainer">
        <div className="ticketListItem">
          <div><Link to={"blogs/" +blogid}>{blogid}</Link></div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        {this.props.blogs.hits.map(this.createListItem)}
      </div>
    )
  }
}

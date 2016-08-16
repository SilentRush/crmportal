import React from "react";
import { Link, browserHistory } from "react-router";

export default class BlogList extends React.Component{
  constructor(props, context){
    super(props);
  }

  createListItem(blog){
    const { title, thumbnail,createdate, body } = blog._source;
    let Createdate = new Date(createdate);
    let thumb = thumbnail;
    if(thumb == "")
      thumb = "";
    return (
      <div key={blog._id} className="ticketListContainer">
        <div className="ticketListItem">
          <img src={thumb} onError={(e)=>{e.target.src = '';}} style={{borderRadius:"4px 4px 0px 0px",width:"100%"}}></img>
          <div className="blogBody">
            <div><Link to={"/blog/" +blog._id}>{title}</Link></div>
            <div>{body.substring(0,200) + "..."}</div>
            <div>{Createdate.toLocaleString()}</div>
          </div>
        </div>
      </div>
    )
  }
  render(){
    return(
      <div>
        <input type="button" className="btn btn-success" value="Create a Blog" onClick={()=>{this.context.router.push('/insert/blog')}} />
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

BlogList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

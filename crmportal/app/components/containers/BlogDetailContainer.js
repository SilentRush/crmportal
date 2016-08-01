import React from "react";
import { connect } from 'react-redux';
import * as blogApi from '../../api/blog-api';
import * as accountApi from '../../api/account-api';
import BlogDetail from "../views/BlogDetail";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {Entity} from 'draft-js';

class BlogDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    var data;
    let blogId;
    if(this.props.params)
      blogId = this.props.params.blogid;
    blogApi.getBlog(blogId).then(
      () => {

      }
    ).then(()=>{
      this.commentList = <CommentListContainer entityid={this.props.blog.blogid} type={"blog"} />;
    });
  }


  render(){
    return (
      <div className="row">
        <div className="col-sm-3 col-xs-12 col-md-3">

        </div>
        <div className="col-sm-9 col-xs-12 col-md-9">
          <BlogDetail ticket={this.props.ticket} />
          <div className="ticketDetailContainer card-shadow">
            <div className="ticketDetailHeader">Comments</div>
            <div className="ticketDetail">
              {this.commentList}
              <CommentContainer isEdit={true} entityid={this.props.blog.blogid} type={"blog"} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = function(store) {
  return {
    blog: store.blogState.blog
  };
};

export default connect(mapStateToProps)(BlogDetailContainer);

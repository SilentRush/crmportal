import React from "react";
import { connect } from 'react-redux';
import * as blogApi from '../../api/blog-api';
import * as userApi from '../../api/user-api';
import BlogDetail from "../views/BlogDetail";
import CommentListContainer from "./CommentListContainer";
import CommentContainer from "./CommentContainer";
import {Entity} from 'draft-js';

class BlogDetailContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {commentList:'', user:{"_source":{firstname:'',lastname:''}}};
  }

  componentDidMount(){
    let blogId;
    if(this.props.params)
      blogId = this.props.params.blogid;
    blogApi.getBlog(blogId).then(()=>{
      this.setState({commentList: <CommentListContainer isEdit={false} entityid={this.props.blog._id} type={"blog"} />});
      userApi.getUser(this.props.blog._source.userid);
    });

  }


  render(){
    return (
      <div className="row">
        <div className="col-sm-12 col-xs-12 col-md-12">
          <BlogDetail user={this.props.user} blog={this.props.blog} />
          <div className="entityDetailContainer card-shadow">
            <div className="entityDetailHeader">Comments</div>
            <div className="entityDetail">
              {this.state.commentList}
              <CommentContainer isEdit={true} entityid={this.props.blog._id} type={"blog"} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = function(store) {
  return {
    blog: store.blogState.blog,
    user: store.userState.user
  };
};

export default connect(mapStateToProps)(BlogDetailContainer);

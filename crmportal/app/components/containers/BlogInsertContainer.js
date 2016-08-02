import React from "react";
import { connect } from 'react-redux';
import * as blogApi from '../../api/blog-api';
import BlogInsert from "../views/BlogInsert";
import {Entity} from 'draft-js';
import { Link, browserHistory } from "react-router";

class BlogInsertContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {isEdit:true, title:'', thumbnail:'', rawbody:{}, body:''};
    this.submitBlog = () => this._submitBlog();
    this.updateComment = (comment) => this._updateComment(comment);

    this.delete = () => {
      commentApi.deleteComment(this.props.comment._id);
    }
    this.changeTitle = (e) => {
      this.setState({title:e.target.value});
    }
    this.changeThumbnail = (e) => {
      this.setState({thumbnail:e.target.value});
    }
    this.changeBody = (body) => {
      this.setState({rawbody:body.rawbody,body:body.body});
      console.log(this.state);
    }

  }

  _submitBlog(blog){
    let blogObj = {
      rawbody: this.state.rawbody,
      body: this.state.body,
      title: this.state.title,
      thumbnail: this.state.thumbnail
    }
    blogApi.addBlog(blogObj).then(() => {
      this.props.history.push('/blogs/' + this.props.blog._id);
    });
  }

  render(){
    return (
      <div className="row">
        <div className="col-sm-12 col-xs-12 col-md-12">
          <BlogInsert
            isEdit={this.state.isEdit}
            changeTitle={this.changeTitle}
            changeThumbnail={this.changeThumbnail}
            changeBody={this.changeBody}
            submitBlog={this.submitBlog}
          />
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

export default connect(mapStateToProps)(BlogInsertContainer);

import React from "react";
import { connect } from 'react-redux';
import * as blogApi from '../../api/blog-api';
import store from '../../store';
import BlogList from "../views/BlogList";
import { loadSearchLayout } from '../../actions/search-layout-actions';

class BlogListContainer extends React.Component{
  componentDidMount(){
    blogApi.getBlogs(0, 40);
    store.dispatch(loadSearchLayout('blogs', 'Blog Results'));
  }

  render(){
    return (
      <BlogList blogs={this.props.blogs} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    blogs: store.blogState.blogs
  };
};

export default connect(mapStateToProps)(BlogListContainer);

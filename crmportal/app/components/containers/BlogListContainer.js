import React from "react";
import { connect } from 'react-redux';
import * as blogApi from '../../api/blog-api';
import store from '../../store';
import BlogList from "../views/BlogList";
import { loadSearchLayout } from '../../actions/search-layout-actions';

class BlogListContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {blogs1:[],blogs2:[],blogs3:[]};
  }
  componentDidMount(){
    blogApi.getBlogs(0, 40);
    store.dispatch(loadSearchLayout('blogs', 'Blog Results'));
  }

  componentWillReceiveProps(props){
    var state = 1;
    var b1 = [], b2 = [], b3 = [];
    for(var i = 0; i < props.blogs.hits.length; i++){
      if(state == 1){
        b1.push(props.blogs.hits[i]);
        state = 2;
      }
      else if(state == 2){
        b2.push(props.blogs.hits[i]);
        state = 3;
      }
      else if(state == 3){
        b3.push(props.blogs.hits[i]);
        state = 1;
      }
    }
    this.setState({blogs1:b1,blogs2:b2,blogs3:b3});
  }

  render(){
    return (
      <BlogList blogs={this.props.blogs} history={this.props.history} blogs1={this.state.blogs1} blogs2={this.state.blogs2} blogs3={this.state.blogs3} />
    )
  }
}

const mapStateToProps = function(store) {
  return {
    blogs: store.blogState.blogs
  };
};

export default connect(mapStateToProps)(BlogListContainer);

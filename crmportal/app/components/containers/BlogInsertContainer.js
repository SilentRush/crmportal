import React from "react";
import { connect } from 'react-redux';
import * as blogApi from '../../api/blog-api';
import BlogInsert from "../views/BlogInsert";
import {Entity} from 'draft-js';
import { Link, browserHistory } from "react-router";
import {addError,removeError} from "../Utility/ErrorUtilities";

class BlogInsertContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {isEdit:true, title:'', thumbnail:'', rawbody:{}, body:'',errors:{}};
    this.submitBlog = () => this._submitBlog();
    this.updateBlog = () => this._updateBlog();

    this.isValid = (successCallback) => this._isValid(successCallback);

    this.changeTitle = (e) => {
      this.setState({title:e.target.value}, () => {this.setState(this.validateTitle())});
    }
    this.changeThumbnail = (value) => {
      this.setState({thumbnail:value},() => {this.setState(this.validateThumbnail())});
    }
    this.changeBody = (body) => {
      this.setState({rawbody:body.rawbody,body:body.body});
    }
  }

  _isValid(successCallback){
    let nextState = Object.assign({},this.state);
    nextState = Object.assign({}, this.validateTitle(nextState));
    nextState = Object.assign({}, this.validateThumbnail(nextState));
    this.setState(nextState,()=>{successCallback()});
  }

  validateTitle(state = 0){
    let nextState
    if(state)
      nextState = Object.assign({},state);
    else
      nextState = Object.assign({},this.state);
    if(!nextState.title || nextState.title == ""){
      nextState = Object.assign({}, addError(nextState,"Title Missing", "title"));
    }
    else{
      nextState = Object.assign({}, removeError(nextState,"Title Missing", "title"));
    }
    return nextState;
  }

  validateThumbnail(state = 0){
    let nextState
    if(state)
      nextState = Object.assign({},state);
    else
      nextState = Object.assign({},this.state);

    if(nextState.thumbnail){
      let img = document.createElement("img");
      img.className = "thumbnailImg";
      img.src = nextState.thumbnail;
      //img.crossOrigin = "anonymous";
      img.onerror = (e) => {
        nextState = Object.assign({},addError(nextState, "Thumbnail is required to be a valid Image", "thumbnail"));
        nextState.thumbnail = "";
      }
      img.onload = (e) =>{
        nextState = Object.assign({},removeError(nextState, "Thumbnail is required to be a valid Image", "thumbnail"));
      }
    }

    if(nextState.thumbnail == ""){
      nextState = Object.assign({}, addError(nextState,"Thumbnail is required.", "thumbnail"));
      nextState = Object.assign({}, addError(nextState, "Thumbnail is required to be a valid Image", "thumbnail"));
    }
    else{
      nextState = Object.assign({},removeError(nextState,"Thumbnail is required.", "thumbnail"));
    }
    return nextState;
  }

  _submitBlog(blog){
    this.isValid(()=> {
      if(Object.keys(this.state.errors).length == 0){
        let blogObj = {
          rawbody: this.state.rawbody,
          body: this.state.body,
          title: this.state.title,
          thumbnail: this.state.thumbnail
        }
        blogApi.addBlog(blogObj).then(() => {
          this.context.router.push('/blog/' + this.props.blog._id);
        });
      }
    });
  }

  _updateBlog(blog){
    this.isValid(()=> {
      if(Object.keys(this.state.errors).length == 0){
        let blogObj = {
          rawbody: this.state.rawbody,
          body: this.state.body,
          title: this.state.title,
          thumbnail: this.state.thumbnail
        }
        blogApi.updateBlog(blogObj).then(() => {
          this.context.router.push('/blog/' + this.props.blog._id);
        });
      }
    });
  }

  componentDidMount(){
    if(this.props.params){
      let blogId;
      blogId = this.props.params.blogid;
      blogApi.getBlog(blogId).then(()=>{
        console.log(this.props.blog._source);
        const {title, thumbnail, rawbody, body, createdate,userid,updatedate} = this.props.blog._source;
        this.setState({title:title,rawbody:rawbody,body:body,thumbnail:thumbnail});
      });
    }
  }

  render(){
    let blogInsertUpdate, title;
    if(this.props.isInsert){
      blogInsertUpdate = this.submitBlog;
      title = "Create a new Blog";
    }
    else if(this.props.isUpdate){
      blogInsertUpdate = this.updateBlog;
      title = "Update Blog";
    }
    return (
      <div className="row">
        <div className="col-sm-12 col-xs-12 col-md-12">
          <BlogInsert
            thumbnail={this.state.thumbnail}
            isEdit={this.state.isEdit}
            changeTitle={this.changeTitle}
            changeThumbnail={this.changeThumbnail}
            changeBody={this.changeBody}
            submitBlog={blogInsertUpdate}
            addError={this.addError}
            removeError={this.removeError}
            errors={this.state.errors}
            isValid={this.props.isValid}
            headerTitle={title}
            blog={this.props.blog}
            isUpdate={this.props.isUpdate}
          />
        </div>
      </div>
    )
  }
}

BlogInsertContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = function(store) {
  return {
    blog: store.blogState.blog
  };
};

export default connect(mapStateToProps)(BlogInsertContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCommentsByPost } from '../store/comments/actions';
import Header from '../components/Header';
import PostsList from '../components/PostsList';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }

  loadComments = () => {
    this.props.getCommentsByPost('8xf0y6ziyjabvozdd253nd');
    console.log(this.props.categories);
  };

  render() {
    return (
      <div className="c-app-container">
        <Header />
        <div className="c-app-main">
          <PostsList />
          {/* <button onClick={this.loadComments}>test get comments</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  //post: state.posts.post,
  comments: state.comments,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  //getPostContent: (postId) => dispatch(getPostContent(postId)),
  getCommentsByPost: postId => dispatch(getCommentsByPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

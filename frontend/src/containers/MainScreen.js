import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCommentsByPost } from '../store/comments/actions';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  loadComments = () => {
    this.props.getCommentsByPost('8xf0y6ziyjabvozdd253nd');
  };

  render() {
    return (
      <div>
        <button onClick={this.loadComments} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  //post: state.posts.post,
  comments: state.comments,
});

const mapDispatchToProps = dispatch => ({
  //getPostContent: (postId) => dispatch(getPostContent(postId)),
  getCommentsByPost: postId => dispatch(getCommentsByPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

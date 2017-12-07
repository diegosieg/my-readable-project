import React from 'react';
import { connect } from 'react-redux';
import PostItem from '../components/PostItem';

import '../App.css';

const PostsList = ({ posts }) => {
  return (
    <div className="c-posts-list">
      {posts.map(post => <PostItem key={post.id} postId={post.id} />)}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default connect(mapStateToProps, null)(PostsList);

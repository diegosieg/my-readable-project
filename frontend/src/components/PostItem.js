import React from 'react';
import { connect } from 'react-redux';
import escapeRegExp from 'escape-string-regexp';

import '../App.css';

const PostItem = ({ posts, postId }) => {
  let myPostItem;
  if (postId) {
    const match = new RegExp(escapeRegExp(postId), 'i');
    myPostItem = posts.filter(post => match.test(post.id));
  }
  let postDetails = myPostItem[0];
  console.log(postDetails);

  return (
    <div className="c-post-item">
      <h2>{postDetails.title}</h2>
      <p>{postDetails.body}</p>
      <p>by: {postDetails.author}</p>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default connect(mapStateToProps, null)(PostItem);

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Moment from 'react-moment';
import escapeRegExp from 'escape-string-regexp';
import { MdCreate, MdDelete } from 'react-icons/lib/md';

import './PostItem.css';

const PostItem = ({ posts, postId }) => {
  // Set the output format for every react-moment instance.
  Moment.globalFormat = 'ddd DD MMM YYYY, HH:mm';

  let myPostItem;
  if (postId) {
    const match = new RegExp(escapeRegExp(postId), 'i');
    myPostItem = posts.filter(post => match.test(post.id));
  }
  let postDetails = myPostItem[0];
  //console.log(postDetails);
  let postDate = postDetails.timestamp / 1000;
  let comments = postDetails.commentCount === 1 ? 'comment' : 'comments';

  return (
    <div className="c-post-item">
      <Link to={`/post/${postDetails.id}`}>
        <h2 className="c-post-item-title">{postDetails.title}</h2>
        <p>
          Created by: {postDetails.author}
          <span>
            {` - on `}
            <Moment unix>{postDate}</Moment>
          </span>
        </p>
      </Link>
      <div className="c-post-actions">
        {/* <button onClick={this.onDelete} className="c-post-actions__link c-post-actions__link--delete"><MdDelete/><span>Delete</span></button> */}
        <Link
          to={`/edit/${postDetails.id}`}
          className="c-post-actions__link c-post-actions__link--edit"
        >
          {' '}
          <MdCreate />
          <span>Edit</span>
        </Link>
      </div>
      {/* <p>{postDetails.body}</p> */}
      {postDetails.commentCount >= 1 ? (
        <span>{`${postDetails.commentCount}  ${comments}`}</span>
      ) : (
        <span>No comments yet</span>
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default withRouter(connect(mapStateToProps, null)(PostItem));

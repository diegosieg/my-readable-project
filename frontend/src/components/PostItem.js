import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Moment from 'react-moment';
import escapeRegExp from 'escape-string-regexp';
import { MdCreate, MdDelete } from 'react-icons/lib/md';
import VoteCounter from '../components/VoteCounter';
import { deletePost } from '../store/posts/actions';

import './PostItem.css';

const PostItem = ({ posts, postId, history, deletePost }) => {
  // Set the output format for every react-moment instance.
  Moment.globalFormat = 'ddd DD MMM YYYY, HH:mm';

  let myPostItem;
  if (postId) {
    const match = new RegExp(escapeRegExp(postId), 'i');
    myPostItem = posts.filter(post => match.test(post.id));
  }
  let postDetails = myPostItem[0];
  //console.log(postDetails);
  let comments = postDetails.commentCount === 1 ? 'comment' : 'comments';

  function onDeletePost() {
    if (postId) {
      if (window.confirm('Do you want to delete this post?')) {
        deletePost(postId);
        history.push('/');
      }
    }
  }

  return (
    <div className="c-post-item">
      <div>
        <span className={`c-post-category__tag c-tag--${postDetails.category}`}>
          {postDetails.category}
        </span>
        <Link to={`/${postDetails.category}/post/${postDetails.id}`}>
          <h2 className="c-post-item-title">{postDetails.title}</h2>
        </Link>
        <div className="c-post__meta">
          <span className="c-post__info-box">
            <p className="c-post__info">
              Created by:{' '}
              <span className="c-post__author">{postDetails.author}</span>
              <span className="c-post__time">
                {` - on `}
                <Moment unix>{postDetails.timestamp / 1000}</Moment>
              </span>
            </p>
            <div className="c-post-actions">
              <a
                href=""
                onClick={onDeletePost}
                className="c-post-actions__link c-post-actions__link--delete"
              >
                <MdDelete />
                <span>Delete</span>
              </a>
              <Link
                to={`/edit/${postDetails.id}`}
                className="c-post-actions__link c-post-actions__link--edit"
              >
                {' '}
                <MdCreate />
                <span>Edit</span>
              </Link>
            </div>
          </span>
          <span className="c-post__counter">
            <VoteCounter
              typeSection={'post'}
              postId={postDetails.id}
              voteValue={postDetails.voteScore}
            />
          </span>
        </div>

        <div className="c-post__comments">
          <Link to={`/${postDetails.category}/post/${postDetails.id}`}>
            {postDetails.commentCount >= 1 ? (
              <span>{`${postDetails.commentCount} ${comments}`}</span>
            ) : (
              <span>No comments yet</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default withRouter(connect(mapStateToProps, { deletePost })(PostItem));

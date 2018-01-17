import React, { Component } from 'react';
import Moment from 'react-moment';
import { getCommentsByPost } from '../store/comments/actions';
import { getPostContent, deletePost } from '../store/posts/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import VoteCounter from '../components/VoteCounter';
import CommentList from '../components/CommentList';
import { MdCreate, MdDelete } from 'react-icons/lib/md';

import './PostItem.css';
import './PostView.css';

class PostView extends Component {
  constructor() {
    super();
    this.state = {
      selectedPost: null,
    };
  }

  componentDidMount() {
    this.showPost(this.props);
    this.loadComments(this.props);
    //console.log(this.props);
  }

  showPost(props) {
    const { params } = props.match;
    //console.log(params);
    if (params && params.id) {
      this.setState({ selectedPost: params.id });
      props.getPostContent(params.id);
    }
  }

  loadComments = props => {
    const { params } = props.match;
    if (params && params.id) {
      props.getCommentsByPost(params.id);
      //console.log(this.props);
    }
  };

  render() {
    const { post, deletePost, history } = this.props;
    let postToDisplay = post;
    //let selectedPost = this.state.selectedPost;

    let postDetails = postToDisplay;

    // Set the output format for every react-moment instance.
    Moment.globalFormat = 'ddd DD MMM YYYY, HH:mm';

    //console.log(comments);

    return (
      <div className="c-post-item c-post-view">
        {postDetails !== undefined ? (
          <div>
            <span
              className={`c-post-category__tag c-tag--${postDetails.category}`}
            >
              {postDetails.category}
            </span>
            <h2>{postDetails.title}</h2>
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
                    onClick={event => {
                      event.preventDefault();
                      if (window.confirm('Do you want to delete this post?')) {
                        deletePost(postDetails.id);
                        history.push('/');
                      }
                    }}
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
                  postId={post.id}
                  voteValue={post.voteScore}
                />
              </span>
            </div>

            <p className="c-post__body">{postDetails.body}</p>
          </div>
        ) : (
          <span>Loading...</span>
        )}
        <CommentList />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
  comments: state.comments.commentsList,
  post: state.posts.post,
});

const mapDispatchToProps = dispatch => ({
  getCommentsByPost: postId => dispatch(getCommentsByPost(postId)),
  getPostContent: postId => dispatch(getPostContent(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);

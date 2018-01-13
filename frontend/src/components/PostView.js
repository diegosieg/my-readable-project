import React, { Component } from 'react';
import Moment from 'react-moment';
import { getCommentsByPost } from '../store/comments/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import VoteCounter from '../components/VoteCounter';
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
    } else {
      this.setState({ selectedPost: '' });
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
    const { posts, comments } = this.props;
    let postToDisplay;
    let selectedPost = this.state.selectedPost;

    if (selectedPost !== '') {
      postToDisplay = posts.filter(post => post.id === selectedPost);
    }

    let postDetails = postToDisplay[0];

    // Set the output format for every react-moment instance.
    Moment.globalFormat = 'ddd DD MMM YYYY, HH:mm';

    //console.log(comments);

    return (
      <div className="c-post-item c-post-view">
        {postDetails !== undefined ? (
          <div>
            <h2>{postDetails.title}</h2>
            <p>{postDetails.body}</p>
            <p>
              Created by: {postDetails.author}
              <span>
                {` - on `}
                <Moment unix>{postDetails.timestamp / 1000}</Moment>
              </span>
            </p>
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
            <VoteCounter />
          </div>
        ) : (
          <span>Loading...</span>
        )}

        {comments && comments.length > 1 ? (
          <div>
            <h4>Comments:</h4>
            {comments.map(comment => (
              <div className="c-posts-list-item" key={comment.id}>
                <p>{comment.body}</p>
                <p>
                  by: {comment.author}{' '}
                  <span>
                    {` - on `}
                    <Moment unix>{comment.timestamp / 1000}</Moment>
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <span>No comments yet!!!!</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
  comments: state.comments.commentsList,
});

const mapDispatchToProps = dispatch => ({
  getCommentsByPost: postId => dispatch(getCommentsByPost(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);

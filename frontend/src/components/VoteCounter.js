import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/lib/md';
import { ratingPost } from '../store/posts/actions';
import { ratingComment } from '../store/comments/actions';
import './VoteCounter.css';

class VoteCounter extends Component {
  incrementVote = (postId, vote) => {
    this.props.ratingPost(postId, vote);
  };
  decreaseVote = (postId, vote) => {
    this.props.ratingPost(postId, vote);
  };

  incrementComment = (commentId, vote) => {
    this.props.ratingComment(commentId, vote);
  };
  decreaseComment = (commentId, vote) => {
    this.props.ratingComment(commentId, vote);
  };

  render() {
    const { voteValue, postId, commentId, typeSection } = this.props;

    const valueStyle = () => {
      const valueName =
        voteValue < 0
          ? 'c-vote-counter-value--negative'
          : 'c-vote-counter-value--positive';
      return valueName;
    };

    return (
      <div className="c-vote-counter">
        {postId !== undefined || commentId !== undefined ? (
          <div>
            {typeSection === 'post' ? (
              <div>
                <button
                  className="c-vote-counter-button"
                  onClick={() => this.incrementVote(postId, 'upVote')}
                >
                  <MdKeyboardArrowUp />
                </button>
                <h2 className={valueStyle()}>{voteValue}</h2>
                <button
                  className="c-vote-counter-button"
                  onClick={() => this.decreaseVote(postId, 'downVote')}
                >
                  <MdKeyboardArrowDown />
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="c-vote-counter-button"
                  onClick={() => this.incrementComment(commentId, 'upVote')}
                >
                  <MdKeyboardArrowUp />
                </button>
                <h2 className={valueStyle()}>{voteValue}</h2>
                <button
                  className="c-vote-counter-button"
                  onClick={() => this.decreaseComment(commentId, 'downVote')}
                >
                  <MdKeyboardArrowDown />
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: state.posts.post,
  posts: state.posts.postsList,
});

const mapDispatchToProps = dispatch => ({
  ratingPost: (postId, vote) => dispatch(ratingPost(postId, vote)),
  ratingComment: (commentId, vote) => dispatch(ratingComment(commentId, vote)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteCounter);

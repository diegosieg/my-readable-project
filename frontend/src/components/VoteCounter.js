import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/lib/md';
import { ratingPost } from '../store/posts/actions';
import './VoteCounter.css';

class VoteCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
    };
  }

  componentDidMount() {
    this.setState({ votes: this.props.voteValue });
  }

  incrementVote = (postId, vote) => {
    this.props.ratingPost(postId, vote);
    //this.setState({ votes: this.state.votes + 1 });
  };
  decreaseVote = (postId, vote) => {
    this.props.ratingPost(postId, vote);
    //this.setState({ votes: this.state.votes - 1 });
  };

  render() {
    //const { votes } = this.state;
    const { voteValue, postId } = this.props;

    const valueStyle = () => {
      const valueName =
        voteValue < 0
          ? 'c-vote-counter-value--negative'
          : 'c-vote-counter-value--positive';
      return valueName;
    };

    return (
      <div className="c-vote-counter">
        {postId !== undefined ? (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteCounter);

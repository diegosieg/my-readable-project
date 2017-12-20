import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

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

  render() {
    const { posts } = this.props;
    let postToDisplay;
    let selectedPost = this.state.selectedPost;

    if (selectedPost !== '') {
      postToDisplay = posts.filter(post => post.id === selectedPost);
    }

    let postDetails = postToDisplay[0];

    // Set the output format for every react-moment instance.
    Moment.globalFormat = 'ddd DD MMM YYYY, HH:mm';

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
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default connect(mapStateToProps, null)(PostView);

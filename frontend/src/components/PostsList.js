import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostItem from '../components/PostItem';

import '../App.css';

class PostsList extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: null,
    };
  }

  componentDidMount() {
    this.showCategory(this.props);
    //console.log(this.props);
  }

  showCategory(props) {
    const { params } = props.match;
    //console.log(params);
    if (params && params.category) {
      this.setState({ selectedCategory: params.category });
    } else {
      this.setState({ selectedCategory: 'all' });
    }
  }

  render() {
    const { posts } = this.props;
    let postsToDisplay;
    let selectedCategory = this.state.selectedCategory;
    //console.log(selectedCategory);

    if (selectedCategory !== 'all') {
      postsToDisplay = posts.filter(post => post.category === selectedCategory);
    } else {
      postsToDisplay = posts;
    }

    return (
      <div className="c-posts-list">
        <h2>{this.props.match.params.category}</h2>
        {postsToDisplay.map(post => (
          <PostItem key={post.id} postId={post.id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default withRouter(connect(mapStateToProps, null)(PostsList));

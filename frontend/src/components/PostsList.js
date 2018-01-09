import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PostItem from '../components/PostItem';

import './PostsList.css';

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
        <h2 className="c-posts-list-title">{`${selectedCategory} articles`}</h2>
        {postsToDisplay.length > 0 ? (
          <div>
            {postsToDisplay.map(post => (
              <div className="c-posts-list-item" key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <PostItem postId={post.id} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>Sorry, no posts in this category yet.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default withRouter(connect(mapStateToProps, null)(PostsList));

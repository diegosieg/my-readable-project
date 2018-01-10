import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
//import api from '../services/ReadableAPI';

import { createPost } from '../store/posts/actions';

//import './PostsList.css';

class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      //categoriesLoaded: false,
      category: '',
      selectedCategory: 'react',
      newPostTitle: '',
      newPostBody: '',
      newPostUsername: '',
      postSubmitted: false,
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleCreatePostSubmit = event => {
    event.preventDefault();
    let postData = {
      title: this.state.newPostTitle,
      body: this.state.newPostBody,
      author: this.state.newPostUsername,
      category: this.state.selectedCategory,
    };

    // api.createPost(postData)
    //   .then(() => {
    //     this.setState({postSubmitted: true})
    //   });

    createPost(postData);
    this.setState({ postSubmitted: true });

    console.log(postData);
  };

  componentDidMount() {}

  render() {
    const { posts } = this.props;

    return (
      <div className="o-post-form__container">
        <h2 className="c-post-form__title">Create a new post</h2>
        {this.state.postSubmitted && <Redirect to="/" />}
        <form
          className="c-post-form__main"
          action=""
          onSubmit={this.handleCreatePostSubmit}
        >
          <div className="c-post-form__content">
            <input
              name="newPostTitle"
              type="text"
              value={this.state.newPostTitle}
              onChange={this.handleInputChange}
              placeholder="Post Title"
            />
            <textarea
              name="newPostBody"
              id=""
              value={this.state.newPostBody}
              onChange={this.handleInputChange}
              placeholder="Type your text"
            />
            <input
              name="newPostUsername"
              type="text"
              value={this.state.newPostUsername}
              onChange={this.handleInputChange}
              placeholder="Author's Name"
            />
          </div>
          <div className="c-post-form__controls">
            <input
              type="submit"
              value="Publish Post"
              className="c-post-form__button"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

// export default withRouter(connect(mapStateToProps, null)(PostForm));
export default withRouter(connect(mapStateToProps, { createPost })(PostForm));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCommentsByPost } from '../store/comments/actions';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import PostsList from '../components/PostsList';
import PostView from '../components/PostView';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  loadComments = () => {
    this.props.getCommentsByPost('8xf0y6ziyjabvozdd253nd');
    console.log(this.props);
  };

  render() {
    return (
      <div className="c-app-container">
        <Header />
        <div className="c-app-main">
          <Switch>
            <Route exact path="/" render={props => <PostsList {...props} />} />
            <Route
              exact
              path="/:category"
              component={props => <PostsList {...props} />}
            />
            <Route
              exact
              path="/post/:id"
              component={props => <PostView {...props} />}
            />
          </Switch>

          {/* <button onClick={this.loadComments}>test get comments</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  //post: state.posts.post,
  comments: state.comments,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  //getPostContent: (postId) => dispatch(getPostContent(postId)),
  getCommentsByPost: postId => dispatch(getCommentsByPost(postId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainScreen),
);

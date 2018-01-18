import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { MdAddBox } from 'react-icons/lib/md';
import Header from '../components/Header';
import PostsList from '../components/PostsList';
import PostView from '../components/PostView';
import PostForm from '../components/PostForm';

import './MainScreen.css';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  filterPost(posts, id) {
    if (posts !== undefined) {
      return posts.filter(post => post.id === id)[0];
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="c-app-container">
        <Header />
        <div className="c-add-post__button">
          <Link to="/create-post">
            <MdAddBox className="c-icon" />
            <span>Add new post</span>
          </Link>
        </div>
        <div className="c-app-main">
          <Switch>
            <Route exact path="/" render={props => <PostsList {...props} />} />
            <Route
              exact
              path="/category/:category"
              component={props => <PostsList {...props} />}
            />
            <Route
              exact
              path="/:category/post/:id"
              component={props => <PostView {...props} />}
            />
            <Route
              exact
              path="/create-post/"
              component={props => <PostForm {...props} />}
            />
            <Route
              exact
              path="/edit/:id"
              render={({ match }) => (
                <PostForm
                  initialValues={this.filterPost(posts, match.params.id)}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
  categories: state.categories.catList,
});

export default withRouter(connect(mapStateToProps, null)(MainScreen));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import PostsList from '../components/PostsList';
import PostView from '../components/PostView';
import PostForm from '../components/PostForm';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  render() {
    return (
      <div className="c-app-container">
        <Header />
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
              path="/post/:id"
              component={props => <PostView {...props} />}
            />
            <Route
              exact
              path="/create-post/"
              component={props => <PostForm {...props} />}
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

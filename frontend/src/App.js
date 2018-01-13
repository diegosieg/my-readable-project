import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MainScreen from './containers/MainScreen';

import './App.css';
import './components/PostBase.css';

const App = () => {
  return (
    <div className="c-app">
      <MainScreen />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories || [],
    posts: state.posts || [],
  };
};

export default withRouter(connect(mapStateToProps)(App));

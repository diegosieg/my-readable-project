import React from 'react';
import { connect } from 'react-redux';
import MainScreen from './containers/MainScreen';

import './App.css';

const App = () => {
  return (
    <div className="c-app">
      <MainScreen />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories || [],
    posts: state.posts || [],
  };
};

export default connect(mapStateToProps)(App);

import React from 'react';
import { connect } from 'react-redux';
import MainScreen from './containers/MainScreen';

import './App.css';

const App = store => {
  console.log(store);
  //console.log(store.categories);
  //console.log(store.posts);
  return (
    <div className="App">
      <h1>yo!</h1>
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

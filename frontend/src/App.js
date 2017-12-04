import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from './store/categories/actions';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="App">
        <h1>yo!</h1>
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  return {
    fetchCategories: getAllCategories(state),
  };
}

export default connect(mapStateToProps)(App);

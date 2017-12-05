import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>yo!</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state,
  };
};

export default connect(mapStateToProps)(App);

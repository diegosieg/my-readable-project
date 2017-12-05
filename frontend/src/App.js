import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {
  // componentDidMount() {
  //   this.props.fetchCategories;
  // }

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

// const mapDispatchToProps = dispatch => {
//   return {
//     onTodoClick: id => {
//       dispatch(toggleTodo(id));
//     },
//   };
// };

export default connect(mapStateToProps)(App);

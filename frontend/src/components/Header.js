import React from 'react';
import { connect } from 'react-redux';

import '../App.css';

const Header = ({ categories }) => {
  // className={currentCategory === category.path ? 'active' : ''}
  return (
    <header className="c-app-header">
      <h1>Say!</h1>
      <ul>
        <li>All</li>
        {categories.map(category => (
          <li key={category.path}>{category.name}</li>
        ))}
      </ul>
    </header>
  );
};

const mapStateToProps = (state, props) => ({
  categories: state.categories.catList,
  //currentCategory: state.categories.current,
});

export default connect(mapStateToProps, null)(Header);

import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import '../App.css';

const Header = ({ categories }) => {
  // className={currentCategory === category.path ? 'active' : ''}
  return (
    <header className="c-app-header">
      <h1>Say yo!</h1>
      <ul>
        <li>
          <Link to="/">All</Link>
        </li>
        {categories.map(category => (
          <li key={category.path}>
            <Link to={category.path}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

const mapStateToProps = (state, props) => ({
  categories: state.categories.catList,
  //currentCategory: state.categories.current,
});

export default withRouter(connect(mapStateToProps, null)(Header));

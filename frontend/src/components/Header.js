import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import '../App.css';

const Header = ({ categories }) => {
  // className={currentCategory === category.path ? 'active' : ''}
  return (
    <header className="c-app-header">
      <h1>Say yo!</h1>
      <ul>
        <li>
          <NavLink to="/">All</NavLink>
        </li>
        {categories.map(category => (
          <li key={category.path}>
            <NavLink to={`/${category.path}`} activeClassName="selected">
              {category.name}
            </NavLink>
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

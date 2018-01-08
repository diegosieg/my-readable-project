import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import '../App.css';
import './Header.css';

const Header = ({ categories }) => {
  return (
    <header className="c-app-header">
      <NavLink to="/">
        <h1>hey yo!</h1>
      </NavLink>
      <ul>
        <li className="item">
          <NavLink to="/" className="item-all" exact activeClassName="selected">
            All
          </NavLink>
        </li>
        {categories.map(category => (
          <li key={category.path} className="item">
            <NavLink
              exact
              to={`/${category.path}`}
              className={`item-${category.path}`}
              activeClassName="selected"
            >
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
});

export default withRouter(connect(mapStateToProps, null)(Header));

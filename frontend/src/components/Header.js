import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';

import '../App.css';
import './Header.css';

const Header = ({ categories }) => {
  return (
    <header className="c-app-header">
      <NavLink to="/">
        <h1 className="c-app-header-title">hey yo!</h1>
      </NavLink>
      <ul>
        <li className="c-nav-item">
          <NavLink
            to="/"
            className="c-nav-item-all"
            exact
            activeClassName="selected"
          >
            All articles
          </NavLink>
        </li>
        {categories.map(category => (
          <li key={category.path} className="c-nav-item">
            <NavLink
              exact
              to={`/category/${category.path}`}
              className={`c-nav-item-${category.path}`}
              activeClassName="selected"
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <Link to="/create-post">
          <span>Add post</span>
          {/* <PostItem postId={post.id} /> */}
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = (state, props) => ({
  categories: state.categories.catList,
});

export default withRouter(connect(mapStateToProps, null)(Header));

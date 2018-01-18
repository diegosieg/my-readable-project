import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { MdAddBox, MdLibraryBooks } from 'react-icons/lib/md';

const PageNotFound = () => {
  return (
    <div className="c-page-not-found">
      <h2>Sorry, page not found!</h2>
      <Link to="/">
        <MdLibraryBooks className="c-icon" />
        <span>See all the available posts</span>
      </Link>
      <h4>or</h4>
      <Link to="/create-post">
        <MdAddBox className="c-icon" />
        <span>Create a new post</span>
      </Link>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
});

export default withRouter(connect(mapStateToProps, null)(PageNotFound));

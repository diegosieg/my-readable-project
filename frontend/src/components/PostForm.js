import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
//import './PostsList.css';

import { createNewPost } from '../store/posts/actions';

let PostForm = props => {
  const { handleSubmit, createNewPost, categories } = props;

  return (
    <div className="o-post-form__container">
      <h2 className="c-post-form__title">Create a new post</h2>
      <form
        onSubmit={handleSubmit(data => {
          const { title, body, author, category = categories[0].name } = data;
          data = { title, body, author, category };
          //if(isEdit) {
          //editPost(match.params.id, data);
          //} else {
          createNewPost(data);
          //}
        })}
        className="c-post-form__main"
      >
        <div>
          <label htmlFor="title">Title:</label>
          <Field name="title" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="body">Content</label>
          <Field name="body" component="textarea" type="text" />
        </div>
        <div className="form-field">
          <label>Category</label>
          <div className="form-field-input">
            <Field name="category" component="select">
              {categories.map(category => (
                <option key={category.path} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <div>
          <label htmlFor="author">Author's name:</label>
          <Field name="author" component="input" type="text" />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
  categories: state.categories.catList,
});

export default reduxForm({
  // a unique name for the form
  form: 'post',
})(withRouter(connect(mapStateToProps, { createNewPost })(PostForm)));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import './PostForm.css';

import { createNewPost } from '../store/posts/actions';

const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const PostForm = props => {
  const {
    handleSubmit,
    createNewPost,
    categories,
    reset,
    submitting,
    history,
  } = props;

  return (
    <div className="c-post-form__container">
      <h2 className="c-post-form__title">Create a new post</h2>
      <form
        className="c-post-form__main"
        onSubmit={handleSubmit(data => {
          const { title, body, author, category = categories[0].name } = data;
          data = { title, body, author, category };
          //if(isEdit) {
          //editPost(match.params.id, data);
          //} else {
          createNewPost(data);
          history.goBack();
          //}
        })}
      >
        <Field
          name="title"
          type="text"
          component={renderField}
          label="Title"
          placeholder="Type your amazing title..."
        />

        <div>
          <label htmlFor="body">Content</label>
          <Field
            name="body"
            component="textarea"
            placeholder="Tell your amazing story..."
            type="text"
          />
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

        <Field
          name="author"
          type="text"
          component={renderField}
          label="Author's name"
          placeholder="Your writer name..."
        />

        <button
          className="c-btn c-btn__submit"
          type="submit"
          disabled={submitting}
        >
          Publish
        </button>

        <button
          className="c-btn c-btn__cancel"
          type="button"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import './PostForm.css';

import { createNewPost, editPost } from '../store/posts/actions';

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

class PostForm extends Component {
  componentDidMount() {
    this.displayPostContentToEdit(this.props);
  }

  displayPostContentToEdit(props) {
    const { params } = props.match;
    const { posts } = props;
    //console.log(params);
    if (params && params.id) {
      if (posts !== undefined) {
        //console.log(posts);
        //console.log(params.id);
        const postToEdit = posts.filter(post => post.id === params.id);
        console.log(postToEdit);
      }
    } else {
      return;
    }
  }

  render() {
    const {
      handleSubmit,
      createNewPost,
      editPost,
      categories,
      submitting,
      match,
      history,
    } = this.props;

    const isEditMode = match.url.indexOf('edit') !== -1;
    //console.log(isEditMode);
    const submitBtn = isEditMode ? 'Save' : 'Publish';
    const postFormTitle = isEditMode ? 'Edit your post' : 'Create a new post';

    return (
      <div className="c-post-form__container">
        <h2 className="c-post-form__title">{postFormTitle}</h2>
        <form
          className="c-post-form__main"
          onSubmit={handleSubmit(postData => {
            const {
              title,
              body,
              author,
              category = categories[0].name,
            } = postData;

            postData = { title, body, author, category };

            if (!isEditMode) {
              createNewPost(postData);
              history.goBack();
            } else {
              editPost(match.params.id, postData);
              //console.log(postData);
              history.goBack();
            }
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
            {submitBtn}
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
  }
}

const mapStateToProps = (state, props) => ({
  posts: state.posts.postsList,
  categories: state.categories.catList,
});

export default reduxForm({
  // a unique name for the form
  form: 'post',
})(withRouter(connect(mapStateToProps, { createNewPost, editPost })(PostForm)));

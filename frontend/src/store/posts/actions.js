import api from '../../services/ReadableAPI';
import * as types from './actionTypes';

//get all posts
export const getAllPosts = () => dispatch => {
  api.getAllPosts().then(data => dispatch(getAllPostsDone(data)));
};

const getAllPostsDone = data => {
  return {
    type: types.GET_ALL_POSTS_DONE,
    data,
  };
};

//create post
export const createNewPost = post => dispatch => {
  api.createPost(post).then(data => dispatch(createPostWithSuccess(data)));
};

const createPostWithSuccess = data => {
  return {
    type: types.CREATE_POST_DONE,
    data,
  };
};

//edit post
export const editPost = (id, post) => dispatch => {
  api.updatePost(id, post).then(data => dispatch(editPostWithSuccess(data)));
};

const editPostWithSuccess = data => {
  return {
    type: types.EDIT_POST_DONE,
    data,
  };
};

//get post content
export const getPostContent = postId => dispatch => {
  api.getPostContent(postId).then(data => dispatch(getPostContentDone(data)));
};

const getPostContentDone = data => {
  return {
    type: types.GET_POST_CONTENT_DONE,
    data,
  };
};

// delete post
export const deletePost = postId => dispatch => {
  console.log(postId);
  api.removePost(postId).then(data => dispatch(deletePostDone(data)));
};

const deletePostDone = data => {
  return {
    type: types.DELETE_POST_DONE,
    data,
  };
};

//sort posts by
export const sortPostsBy = data => {
  return { type: types.SORT_POSTS_DONE, data };
};

//votePost
export const ratingPost = (postId, vote) => dispatch => {
  api.ratePostApi(postId, vote).then(data => dispatch(ratePostDone(data)));
};

const ratePostDone = data => {
  return {
    type: types.RATE_POST_DONE,
    data,
  };
};

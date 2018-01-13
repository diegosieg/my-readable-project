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

// export const getPostContent = postId => dispatch => {
//   api
//     .getPostContent(postId)
//     .then(post => dispatch(getPostContentDone(post, postId)));
// };

// const getPostContentDone = (post, postId) => {
//   return {
//     type: types.GET_POST_CONTENT_DONE,
//     post,
//     postId,
//   };
// };

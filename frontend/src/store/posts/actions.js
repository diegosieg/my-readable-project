import api from '../../services/ReadableAPI';
import * as types from './actionTypes';

//get all posts
export const getAllPosts = () => dispatch => {
  api.getAllPosts().then(posts => dispatch(getAllPostsDone(posts)));
};

const getAllPostsDone = posts => {
  return {
    type: types.GET_ALL_POSTS_DONE,
    posts,
  };
};

//create post
export const createPost = data => dispatch => {
  api.createPost(data).then(post => dispatch(createPostWithSuccess(post)));
};

const createPostWithSuccess = post => {
  return {
    type: types.CREATE_POST_DONE,
    post,
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

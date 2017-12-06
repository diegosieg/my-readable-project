import api from '../../services/ReadableAPI';
import * as types from './actionTypes';

export const getAllPosts = () => dispatch => {
  api.getAllPosts().then(posts => dispatch(getAllPostsDone(posts)));
};

const getAllPostsDone = posts => {
  return {
    type: types.GET_ALL_POSTS_DONE,
    posts,
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

import api from '../../services/ReadableAPI';
import * as types from './actionTypes';

export const getCommentsByPost = postId => dispatch => {
  api
    .getCommentsByPost(postId)
    .then(comments => dispatch(getCommentsByPostDone(comments, postId)));
};

const getCommentsByPostDone = (comments, postId) => {
  return {
    type: types.GET_COMMENTS_BY_POST_DONE,
    comments,
    postId,
  };
};

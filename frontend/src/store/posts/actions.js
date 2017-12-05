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

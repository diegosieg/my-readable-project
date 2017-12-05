import * as types from './actionTypes';

const initialState = {
  posts: undefined,
};

const postsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_DONE:
      return action.posts;
    default:
      return state;
  }
};

export default postsReducer;

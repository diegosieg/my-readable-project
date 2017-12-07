import * as types from './actionTypes';

const initialState = {
  postsList: [],
};

const postsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_DONE:
      return {
        ...state,
        postsList: action.posts,
      };
    default:
      return state;
  }
};

export default postsReducer;

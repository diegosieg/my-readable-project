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
    case types.CREATE_POST_DONE:
      return [...state, action.post];
    default:
      return state;
  }
};

export default postsReducer;

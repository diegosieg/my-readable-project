import * as types from './actionTypes';

// const initialState = {
//   postsList: [],
// };

const posts = (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_DONE:
      return {
        ...state,
        postsList: action.posts,
      };
    case types.CREATE_POST_DONE:
      return {
        ...state,
        postsList: [...state, action.post],
      };
    default:
      return state;
  }
};

export default posts;

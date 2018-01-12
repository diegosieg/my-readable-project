import * as types from './actionTypes';

// const initialState = {
//   postsList: [],
// };

const posts = (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_DONE:
      return {
        ...state,
        postsList: action.data,
      };
    case types.CREATE_POST_DONE:
      const postsList = [...state.postsList, action.data];
      return {
        ...state,
        postsList,
      };
    default:
      return state;
  }
};

export default posts;

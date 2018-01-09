import * as types from './actionTypes';

const initialState = {
  posts: [],
};

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_COMMENTS_BY_POST_DONE:
      const comments = action.comments;
      return comments.reduce(
        (newCommentsState, comment) => ({
          ...newCommentsState,
          commentsList: comments,
        }),
        {},
      );

    // return {
    //   ...state,
    //   commentsList: action.comments,
    // };
    default:
      return state;
  }
};

export default commentsReducer;

import * as types from './actionTypes';

const initialState = {
  posts: undefined,
};

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_COMMENTS_BY_POST_DONE:
      const comments = action.comments;
      return comments.reduce(
        (newCommentsState, comment) => ({
          ...newCommentsState,
          [comment.id]: comment,
        }),
        {},
      );

    default:
      return state;
  }
};

export default commentsReducer;

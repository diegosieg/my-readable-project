import * as types from './actionTypes';
import { findIndex } from 'lodash';

const comments = (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_COMMENTS_BY_POST_DONE:
      const comments = action.comments;
      const parentId = action.postId;

      return [...comments.filter(x => x.parentId !== parentId), ...comments];

    case types.CREATE_COMMENT_DONE:
      return [...state, action.data];

    case types.EDIT_COMMENT_DONE:
      let index = findIndex(state, comment => comment.id === action.data.id);
      return [
        // slice the edited comment to keep the right position
        ...state.slice(0, index),
        { ...action.data },
        ...state.slice(index + 1),
      ];

    case types.DELETE_COMMENT_DONE:
      return [...state.filter(comment => comment.id !== action.data)];

    default:
      return state;
  }
};

export default comments;

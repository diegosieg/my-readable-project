import * as types from './actionTypes';
import { findIndex } from 'lodash';

export const posts = (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_ALL_POSTS_DONE:
      return {
        ...state,
        postsList: action.data,
      };

    case types.GET_POST_CONTENT_DONE:
      return {
        ...state,
        post: action.data,
      };

    case types.CREATE_POST_DONE:
      return {
        ...state,
        postsList: [...state.postsList, action.data],
      };

    case types.EDIT_POST_DONE:
      let index = findIndex(
        state.postsList,
        item => item.id === action.data.id,
      );
      return {
        ...state,
        postsList: [
          // slice the edited post to keep the right position
          ...state.postsList.slice(0, index),
          { ...action.data },
          ...state.postsList.slice(index + 1),
        ],
      };

    case types.DELETE_POST_DONE:
      return {
        ...state,
        postsList: [...state.postsList.filter(post => post.id !== action.data)],
      };
    default:
      return state;
  }
};

export default posts;

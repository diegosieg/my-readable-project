import * as types from './actionTypes';

const initialState = {
  catList: [],
};

const categories = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES_DONE:
      return {
        ...state,
        catList: action.categories,
      };
    default:
      return state;
  }
};

export default categories;

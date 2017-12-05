import * as types from './actionTypes';

const initialState = {
  categories: undefined,
};

const categoriesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES_DONE:
      return action.categories;
    default:
      return state;
  }
};

export default categoriesReducer;

//import { getAllCategories } from './actions';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  categories: undefined,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES_DONE:
      return state.merge({
        categories: action.categories,
      });
    default:
      return state;
  }
}

//selectors
// export function getAllCategories(state) {
//   return state.categories;
// }

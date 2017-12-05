import api from '../../services/ReadableAPI';
import * as types from './actionTypes';

export const getAllCategories = () => dispatch => {
  api
    .getAllCategories()
    .then(categories => dispatch(getAllCategoriesDone(categories)));
};

const getAllCategoriesDone = categories => {
  return {
    type: types.GET_ALL_CATEGORIES_DONE,
    categories,
  };
};

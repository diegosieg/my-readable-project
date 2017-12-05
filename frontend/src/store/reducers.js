import { combineReducers } from 'redux';

import categories from './categories/reducer';
import posts from './posts/reducer';

export default combineReducers({
  categories,
  posts,
});

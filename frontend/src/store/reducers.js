import { combineReducers } from 'redux';

import categories from './categories/reducer';
import posts from './posts/reducer';
import comments from './comments/reducer';

export default combineReducers({
  categories,
  posts,
  comments,
});

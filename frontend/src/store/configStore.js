import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import finalReducer from './reducers';

import { getAllCategories } from './categories/actions';
import { getAllPosts } from './posts/actions';

const configStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    finalReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  // fetch initial data
  store.dispatch(getAllCategories());
  store.dispatch(getAllPosts());

  return store;
};

export default configStore;

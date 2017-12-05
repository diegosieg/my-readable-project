import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import finalReducer from './reducers';

//import { loadPosts } from '../actions/posts';
import { getAllCategories } from './categories/actions';

const configStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    finalReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  // fetch initial data
  store.dispatch(getAllCategories());
  //store.dispatch(loadPosts());

  return store;
};

export default configStore;

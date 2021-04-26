import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

let middleware = [thunk];

const __DEV__ = process.env.NODE_ENV === 'develoment'
if (__DEV__) {
  const logger = createLogger({collapsed: true});
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
  
);

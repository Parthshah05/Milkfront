import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
const middlewares = [thunk];

const enhancers = [];
const devToolsExtension = window.devToolsExtension;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}
const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);
const store = createStore(
  rootReducer,
  {},
  composedEnhancers,
);

export default store;

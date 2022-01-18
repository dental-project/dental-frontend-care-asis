import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import part from './parts';

const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const rootReducer = combineReducers({
  part,
});
const store = createStore(rootReducer, enhancer);

export default store;

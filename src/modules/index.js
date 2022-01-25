import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import part from './parts';
import item from './items';

const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const rootReducer = combineReducers({
  part,
  item,
});
const store = createStore(rootReducer, enhancer);

export default store;

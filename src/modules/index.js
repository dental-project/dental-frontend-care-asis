import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import reception from './receptions';
import part from './parts';
import item from './items';
import dental from './dentals';
import price from './prices';
import businessType from './businessTypes';
import businessSector from './businessSectors';
import bank from './banks';

const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const rootReducer = combineReducers({
  reception,
  part,
  item,
  dental,
  price,
  businessType,
  businessSector,
  bank,
});
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;

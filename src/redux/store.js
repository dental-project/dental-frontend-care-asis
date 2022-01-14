import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer';
import logger from 'redux-logger'

const middleware = [logger]

const store = createStore(rootReducer, applyMiddleware(...middleware)); // ...을 사용하면 middleware에 해당하는 껍데기가 없는 logger

export default store;
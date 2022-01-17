import { combineReducers } from "redux"; 
import subscriberReducer from "./subscribers/reducer";
import partsReducer from "./part/reducer";
// import viewReducer from "./subscribers/reducer";
// 2개 이상일때

const rootReducer = combineReducers({
    //views: viewReducer,
    subscribers: subscriberReducer,
    parts: partsReducer
})

export default rootReducer
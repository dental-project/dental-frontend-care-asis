import { combineReducers } from "redux"; 
import subscriberReducer from "./subscribers/reducer";
// import viewReducer from "./subscribers/reducer";
// 2개 이상일때

const rootReducer = combineReducers({
    //views: viewReducer,
    subscribers: subscriberReducer
})

export default rootReducer
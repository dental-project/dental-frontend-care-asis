import { combineReducers } from "redux"; 
import subscriberReducer from "./subscribers/reducer";
import commentsReducer from "./comments/reducer";
// import viewReducer from "./subscribers/reducer";
// 2개 이상일때

const rootReducer = combineReducers({
    //views: viewReducer,
    subscribers: subscriberReducer,
    comments: commentsReducer
})

export default rootReducer
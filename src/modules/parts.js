
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_PART = 'READ_PART';
const ADD_PART = 'ADD_PART';

// action creators
const readPart = createAction(READ_PART, (data) => ({ data }));
const addPart = createAction(ADD_PART, (post) => ({ post }));

// initialState
const initialState = {
  data: [],
};

// middleware
const getPostMiddleware = () => {
  return (dispatch) => {
    apis
      .getPart()
      .then((res) => {
        
        const partData = res.data;

        dispatch(readPart(partData));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const addPostMiddleware = (part) => {
  
  return (dispatch) => {
    apis
      .createPart(part)
      .then((result) => {
        //console.log(result);
        dispatch(addPart(part));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [READ_PART]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
    [ADD_PART]: (state, action) =>
      produce(state, (draft) => {
        draft.data.push(action.payload.post);
      }),
  },
  initialState
);

const parts = {
  getPostMiddleware,
  addPostMiddleware,
};

export { parts };


















// /* 액션 타입 */
// const PART_CREATE = 'part/PART_CREATE';
// const PART_READ = 'part/PART_READ';
// const PART_UPDATE = 'part/PART_UPDATE';
// const PART_REMOVE = 'part/PART_REMOVE';

// /* 액션 생성 함수 */
// export const create = () => ({ type: PART_CREATE });
// export const read = () => ({ type: PART_READ });
// export const update = () => ({ type: PART_UPDATE });
// export const remove = () => ({ type: PART_REMOVE });

// /* 모듈 초기화 */
// const initialState = {
//     items: [],
//     loading: false,
//     err: null
// };

// /* 리듀서 */
// export default function part(state = initialState, action) {
//     switch(action.type) {
//         case PART_CREATE:
//             return {
//                 ...state,
//             };
//         case PART_READ:
//             return {
//                 ...state,
//             };
//         case PART_UPDATE:
//             return {
//                 ...state,
//             };
//         case PART_REMOVE:
//             return {
//                 ...state,
//             };
//         default:
//             return state;
//     }
// }







// import { AXIOS_PART_REQUEST, AXIOS_PART_SUCCESS, AXIOS_PART_FAILURE } from './types'
// import axios from "axios";

// const axiosPartRequest = () => {
//     return {
//         type: AXIOS_PART_REQUEST
//     }
// }

// const axiosPartSuccess = (parts) => {
//     return {
//         type: AXIOS_PART_SUCCESS,
//         payload: parts
//     }
// }

// const axiosPartFailure = (error) => {
//     return {
//         type: AXIOS_PART_FAILURE,
//         payload: error
//     }
// }

// export const axiosParts = () => {
//     return (dispatch) => {
//         dispatch(axiosPartRequest())
//         axios.get("http://localhost:8000/api/code/part/")
//             .then(response => response.json())
//             .then(parts => dispatch(axiosPartSuccess(parts)))
//             .catch(error => dispatch(axiosPartFailure(error)))
//     }
// }

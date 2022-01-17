
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const LOAD_POST = 'LOAD_POST';
const ADD_POST = 'ADD_POST';

// action creators
const loadPost = createAction(LOAD_POST, (list) => ({ list }));
const AddPost = createAction(ADD_POST, (post) => ({ post }));

// initialState
const initialState = {
  list: [],
};

// middleware
const getPostMiddleware = () => {
  return (dispatch) => {
    apis
      .getPost()
      .then((res) => {
        console.log(res);
        
        const post_list = res.data;

        

        dispatch(loadPost(post_list));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const addPostMiddleware = (post) => {
  console.log(post);
  return (dispatch) => {
    apis
      .createPost(post)
      .then((result) => {
        console.log(result);
        dispatch(AddPost(post));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [LOAD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
      }),
  },
  initialState
);

const postCreators = {
  getPostMiddleware,
  addPostMiddleware,
};

export { postCreators };


















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

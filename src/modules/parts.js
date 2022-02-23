import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "apis/axios";

// action 생성
const READ_PART = "READ_PART";
const ADD_PART = "ADD_PART";
const UPDATE_PART = "UPDATE_PART";
const REMOVE_PART = "REMOVE_PART";

// action creators
const readPart = createAction(READ_PART, data => ({ data }));
const addPart = createAction(ADD_PART, data => ({ data }));
const updatePart = createAction(UPDATE_PART, data => ({ data }));
const removePart = createAction(REMOVE_PART, seqId => ({ seqId }));

// initialState
const initialState = {
  data: [],
  loading: false,
  modal: false,
  err: null,
};

// middleware
const getPartMiddleware = () => {
  return dispatch => {
    apis
      .getPart()
      .then(result => {
        const partData = result.data;
        dispatch(readPart(partData));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const addPartMiddleware = part => {
  return dispatch => {
    apis
      .createPart(part)
      .then(result => {
        dispatch(addPart(part));
        alert("파트명을 추가 하였습니다.");
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const updatePartMiddleware = (seqId, contents) => {
  return dispatch => {
    apis
      .patchPart(seqId, contents)
      .then(result => {
        const data = { seq_id: seqId, contents: contents };

        dispatch(updatePart(data));
        alert("파트명을 수정 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const deletePartMiddleware = seqId => {
  console.log(seqId);
  return dispatch => {
    apis
      .deletePart(seqId)
      .then(result => {
        dispatch(removePart(seqId));
        alert("파트명을 삭제 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// reducer
// state -> 초기값, draft -> 상태를 어떻게 업데이트 할지 정의
export default handleActions(
  {
    [READ_PART]: (state, action) =>
      produce(state, draft => {
        draft.data = action.payload.data;
      }),
    [ADD_PART]: (state, action) =>
      produce(state, draft => {
        draft.data.push(action.payload.data);
      }),
    [UPDATE_PART]: (state, action) => 
      produce(state, draft => {
        const index = draft.data.findIndex(
          element => element.seq_id === action.payload.data.seq_id
        );
        draft.data.splice(index, 1);
        draft.data.push(action.payload.data.contents);
      }),
    [REMOVE_PART]: (state, action) =>
      produce(state, draft => {
        const index = draft.data.findIndex(
          element => element.seq_id === action.payload.seqId
        );
        draft.data.splice(index, 1);
      }),
  },
  initialState
);

const parts = {
  getPartMiddleware,
  addPartMiddleware,
  updatePartMiddleware,
  deletePartMiddleware,
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

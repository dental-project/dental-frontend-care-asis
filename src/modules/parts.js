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
  count: 0,
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
        alert(err);
      });
  };
};

const addPartMiddleware = part => {
  return dispatch => {
    apis
      .createPart(part)
      .then(result => {
        
        if (result.data.status === "SUCCESS") {
          dispatch(addPart());
          alert("파트명을 추가 하였습니다.");
        } else {
          alert(result.data.message);
        }
        
      })
      .catch(err => {
        alert(err);
      });
  };
};

const updatePartMiddleware = (seqId, contents) => {
  return dispatch => {
    apis
      .patchPart(seqId, contents)
      .then(result => {
        
        if (result.data.status === "SUCCESS") {
          dispatch(updatePart());
          alert("파트명을 수정 했습니다.");
        } else {
          alert(result.data.message);
        }

      })
      .catch(err => {
        alert(err);
      });
  };
};

const deletePartMiddleware = seqId => {
  return dispatch => {
    apis
      .deletePart(seqId)
      .then(result => {

        if (result.data.status === "SUCCESS") {
          dispatch(removePart());
          alert("파트명을 삭제 했습니다.");
        } else {
          alert(result.data.message);
        }
        
      })
      .catch(err => {
        alert(err);
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
        //draft.data.push(action.payload.data);
        draft.count = draft.count + 1;
      }),
    [UPDATE_PART]: (state, action) =>
      produce(state, draft => {
        // const index = draft.data.findIndex(
        //   element => element.seq_id === action.payload.data.seq_id
        // );
        //draft.data.splice(index, 1);
        //draft.data.push(action.payload.data.contents);
        //draft.modal = false;
        draft.count = draft.count + 1;
      }),
    [REMOVE_PART]: (state, action) =>
      produce(state, draft => {
        // const index = draft.data.findIndex(
        //   element => element.seq_id === action.payload.seqId
        // );
        // draft.data.splice(index, 1);
        draft.count = draft.count + 1;
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
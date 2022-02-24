import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "apis/axios";

// action 생성
const READ_DENTAL = "READ_DENTAL";
const ADD_DENTAL = "ADD_DENTAL";
const UPDATE_DENTAL = "UPDATE_DENTAL";
const REMOVE_DENTAL = "REMOVE_DENTAL";

// action creators
const readDental = createAction(READ_DENTAL, data => ({ data }));
const addDental = createAction(ADD_DENTAL, data => ({ data }));
const updateDental = createAction(UPDATE_DENTAL, data => ({ data }));
const removeDental = createAction(REMOVE_DENTAL, data => ({ data }));

// initialState
const initialState = {
  data: [],
  count: 0,
};

// middleware
const getDentalMiddleware = () => {
  return dispatch => {
    apis
      .getDental()
      .then(result => {
        const dentalData = result.data;
        dispatch(readDental(dentalData));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const addDentalMiddleware = contents => {
  return dispatch => {
    apis
      .createDental(contents)
      .then(result => {
        dispatch(addDental(contents));
        alert("장치를 추가 하였습니다.");
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const updateDentalMiddleware = (seqId, contents) => {
  return dispatch => {
    apis
      .patchDental(seqId, contents)
      .then(result => {
        const data = { seq_id: seqId, contents: contents };

        dispatch(updateDental(data));
        alert("수정 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const deleteDentalMiddleware = seqId => {
  return dispatch => {
    apis
      .deleteDental(seqId)
      .then(result => {
        dispatch(removeDental(seqId));
        alert("삭제 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [READ_DENTAL]: (state, action) =>
      produce(state, draft => {
        draft.data = action.payload.data;
      }),
    [ADD_DENTAL]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [UPDATE_DENTAL]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [REMOVE_DENTAL]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
  },
  initialState
);

const dentals = {
  getDentalMiddleware,
  addDentalMiddleware,
  updateDentalMiddleware,
  deleteDentalMiddleware,
};

export { dentals };

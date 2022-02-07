
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_RECEPTION = 'READ_RECEPTION';
const ADD_RECEPTION = 'ADD_RECEPTION';
const UPDATE_RECEPTION = 'UPDATE_RECEPTION';
const REMOVE_RECEPTION = 'REMOVE_RECEPTION';

// action creators
const readReception = createAction(READ_RECEPTION, (data) => ({ data }));
const addReception = createAction(ADD_RECEPTION, (data) => ({ data }));
const updateReception = createAction(UPDATE_RECEPTION, (data) => ({ data }));
const removeReception = createAction(REMOVE_RECEPTION, (data) => ({ data }));

// initialState
const initialState = {
  data: [],
  loading: false,
  modal: false,
  err: null
};

// middleware
const getReceptionMiddleware = () => {
  return (dispatch) => {
    apis
      .getReception()
      .then((result) => {        
        const receptionData = result.data;
        dispatch(readReception(receptionData));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const addReceptionMiddleware = (contents) => {
  return (dispatch) => {
    apis
      .createReception(contents)
      .then((result) => {
        dispatch(addReception(contents));
        alert("접수 정보를 추가 하였습니다.");
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const updateReceptionMiddleware = (seqId, contents) => {
  return (dispatch) => {
    apis
      .patchPart(seqId, contents)
      .then((result) => {

        const data = { seq_id: seqId, contents: contents }

        dispatch(updateReception(data));
        alert("접수 정보를 수정 했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const deleteReceptionMiddleware = (seqId) => {
  return (dispatch) => {
    apis
      .deleteReception(seqId)
      .then((result) => {
        dispatch(removeReception(seqId));
        alert("접수 정보를 삭제 했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 나중에 손봐야 함
// reducer
export default handleActions(
  {
    [READ_RECEPTION]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
    [ADD_RECEPTION]: (state, action) =>
      produce(state, (draft) => {
        draft.data.push(action.payload);
      }),
    [UPDATE_RECEPTION]: (state, action) => {(
      state.data.map((seq_id) => {
        if(seq_id === action.payload.data.contents.seq_id) {
          console.log(state.seq_id);
        }
      })
    )},
    [REMOVE_RECEPTION]: (state, action) =>
      produce(state, (draft) => {
        draft.data = []
      }),
  },
  initialState
);

const receptions = {
  getReceptionMiddleware,
  addReceptionMiddleware,
  updateReceptionMiddleware,
  deleteReceptionMiddleware,
};

export { receptions };
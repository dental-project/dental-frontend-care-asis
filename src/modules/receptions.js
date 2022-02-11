
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_RECEPTION = 'READ_RECEPTION';
const READ_VENDOR_PART = 'READ_VENDOR_PART';
const ADD_RECEPTION = 'ADD_RECEPTION';
const ADD_RECEPTION_PRICE = 'ADD_RECEPTION_PRICE';
const UPDATE_RECEPTION = 'UPDATE_RECEPTION';
const REMOVE_RECEPTION = 'REMOVE_RECEPTION';

// action creators
const readReception = createAction(READ_RECEPTION, (data) => ({ data }));
const readVendorPart = createAction(READ_VENDOR_PART, (data) => ({ data }));
const addReception = createAction(ADD_RECEPTION, (data) => ({ data }));
const addReceptionPrice = createAction(ADD_RECEPTION_PRICE, (data) => ({ data }));
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

const getVendorPartMiddleware = (seqId) => {
  return (dispatch) => {
    apis
      .getSelectVendorPart(seqId)
      .then((result) => {
        console.log(result);
        const vendorPartData = result.data;
        dispatch(readVendorPart(vendorPartData));
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

const addReceptionPriceMiddleware = (contents) => {
  return (dispatch) => {
    apis
      .createReceptionPrice(contents)
      .then((result) => {
        dispatch(addReceptionPrice(contents));
        alert("접수단가 정보를 추가 하였습니다.");
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
    [READ_VENDOR_PART]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
    [ADD_RECEPTION]: (state, action) =>
      produce(state, (draft) => {
        draft.data.push(action.payload);
      }),
    [ADD_RECEPTION_PRICE]: (state, action) =>
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
  getVendorPartMiddleware,
  addReceptionMiddleware,
  addReceptionPriceMiddleware,
  updateReceptionMiddleware,
  deleteReceptionMiddleware,
};

export { receptions };
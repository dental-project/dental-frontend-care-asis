import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "apis/axios";

// action 생성
const READ_PRICE = "READ_PRICE";
const ADD_PRICE = "ADD_PRICEL";
const UPDATE_PRICE = "UPDATE_PRICE";
const REMOVE_PRICE = "REMOVE_PRICE";

// action creators
const readPrice = createAction(READ_PRICE, data => ({ data }));
const addPrice = createAction(ADD_PRICE, data => ({ data }));
const updatePrice = createAction(UPDATE_PRICE, data => ({ data }));
const removePrice = createAction(REMOVE_PRICE, seqId => ({ seqId }));

// initialState
const initialState = {
  data: [],
  count: 0,
};

// middleware
const getPriceMiddleware = () => {
  return dispatch => {
    apis
      .getPrice()
      .then(result => {
        const priceData = result.data;
        dispatch(readPrice(priceData));
      })
      .catch(err => {
        alert(err);
      });
  };
};

const addPriceMiddleware = contents => {
  return dispatch => {
    apis
      .createPrice(contents)
      .then(result => {
        
        if (result.data.status === "SUCCESS") {
          dispatch(addPrice());
          alert("단가를 추가 하였습니다.");
        } else {
          alert(result.data.message);
        }
        
      })
      .catch(err => {
        alert(err);
      });
  };
};

const updatePriceMiddleware = (seqId, contents) => {
  return dispatch => {
    apis
      .patchPrice(seqId, contents)
      .then(result => {

        if (result.data.status === "SUCCESS") {
          dispatch(updatePrice());
          alert("단가를 수정 했습니다.");
        } else {
          alert(result.data.message);
        }
        
      })
      .catch(err => {
        alert(err);
      });
  };
};

const deletePriceMiddleware = seqId => {
  return dispatch => {
    apis
      .deletePrice(seqId)
      .then(result => {

        if (result.data.status === "SUCCESS") {
          dispatch(removePrice());
          alert("단가를 삭제 했습니다.");
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
export default handleActions(
  {
    [READ_PRICE]: (state, action) =>
      produce(state, draft => {
        draft.data = action.payload.data;
      }),
    [ADD_PRICE]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [UPDATE_PRICE]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [REMOVE_PRICE]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
  },
  initialState
);

const prices = {
  getPriceMiddleware,
  addPriceMiddleware,
  updatePriceMiddleware,
  deletePriceMiddleware,
};

export { prices };

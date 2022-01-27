import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_PRICE = 'READ_PRICE';
const ADD_PRICE = 'ADD_PRICEL';
const UPDATE_PRICE = 'UPDATE_PRICE';
const REMOVE_PRICE = 'REMOVE_PRICE';

// action creators
const readPrice = createAction(READ_PRICE, (data) => ({ data }));
const addPrice = createAction(ADD_PRICE, (data) => ({ data }));
const updatePrice = createAction(UPDATE_PRICE, (data) => ({ data }));
const removePrice = createAction(REMOVE_PRICE, (data) => ({ data }));

// initialState
const initialState = {
  data: [],
  loading: false,
  modal: "false",
  err: null
};

// middleware
const getPriceMiddleware = () => {
  return (dispatch) => {
    apis
      .getPrice()
      .then((result) => {        
        const priceData = result.data;
        dispatch(readPrice(priceData));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const addPriceMiddleware = (contents) => {
  return (dispatch) => {
    apis
      .createPrice(contents)
      .then((result) => {
        console.log(result);
        dispatch(addPrice(contents));
        alert("단가를 추가 하였습니다.");
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const updatePriceMiddleware = (seqId, contents) => {
  return (dispatch) => {
    apis
      .patchPrice(seqId, contents)
      .then((result) => {

        const data = { seq_id: seqId, contents: contents }

        dispatch(updatePrice(data));
        alert("단가를 수정 했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const deletePriceMiddleware = (seqId) => {
  return (dispatch) => {
    apis
      .deletePrice(seqId)
      .then((result) => {
        dispatch(removePrice(seqId));
        alert("단가를 삭제 했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [READ_PRICE]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
    [ADD_PRICE]: (state, action) =>
      produce(state, (draft) => {
        draft.data.push(action.payload.data);
      }),
    
    [UPDATE_PRICE]: (state, action) => {(
      state.data.map((seq_id) => {
        if(seq_id === action.payload.data.contents.seq_id) {
          //console.log(state.seq_id);
        }
      })
    )},
    
    [REMOVE_PRICE]: (state, action) =>
      produce(state, (draft) => {
        draft.data = []
    }),
    // produce(state, (draft) => {
     
    //   }),

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

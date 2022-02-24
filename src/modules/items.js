import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "apis/axios";

// action 생성
const READ_ITEM = "READ_ITEM";
//const READ_SELECT_ITEM = 'READ_SELECT_ITEM';
const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

// action creators
const readItem = createAction(READ_ITEM, data => ({ data }));
//const readSelectItem = createAction(READ_SELECT_ITEM, (data) => ({ data }));
const addItem = createAction(ADD_ITEM, data => ({ data }));
const updateItem = createAction(UPDATE_ITEM, data => ({ data }));
const removeItem = createAction(REMOVE_ITEM, seqId => ({ seqId }));

// initialState
const initialState = {
  data: [],
  count: 0,
};

// middleware
const getItemMiddleware = () => {
  return dispatch => {
    apis
      .getItem()
      .then(result => {
        const itemData = result.data;
        dispatch(readItem(itemData));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const addItemMiddleware = contents => {
  return dispatch => {
    apis
      .createItem(contents)
      .then(result => {
        dispatch(addItem(contents));
        alert("장치를 추가 하였습니다.");
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const updateItemMiddleware = (seqId, contents) => {
  return dispatch => {
    apis
      .patchItem(seqId, contents)
      .then(result => {
        const data = { seq_id: seqId, contents: contents };
        dispatch(updateItem(data));
        alert("장치를 수정 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const deleteItemMiddleware = seqId => {
  return dispatch => {
    apis
      .deleteItem(seqId)
      .then(result => {
        dispatch(removeItem(seqId));
        alert("장치를 삭제 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [READ_ITEM]: (state, action) =>
      produce(state, draft => {
        draft.data = action.payload.data;
      }),
    [ADD_ITEM]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [UPDATE_ITEM]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [REMOVE_ITEM]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
  },
  initialState
);

const items = {
  getItemMiddleware,
  //getSelectItemMiddleware,
  addItemMiddleware,
  updateItemMiddleware,
  deleteItemMiddleware,
};

export { items };

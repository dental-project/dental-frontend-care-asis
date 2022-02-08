
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_SELECT_ITEM = 'READ_SELECT_ITEM';

// action creators
const readSelectItem = createAction(READ_SELECT_ITEM, (data) => ({ data }));

// initialState
const initialState = {
  data: [],
  loading: false,
  modal: false,
  err: null
};

const getSelectItemMiddleware = (seqId) => {
  return (dispatch) => {
    apis
      .getSelectItem(seqId)
      .then((result) => {   
        const itemData = result.data;
        dispatch(readSelectItem(itemData));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

// 나중에 손봐야 함
// reducer
export default handleActions(
  {
    [READ_SELECT_ITEM]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
  },
  initialState
);

const receptionDetails = {
  getSelectItemMiddleware,
};

export { receptionDetails };
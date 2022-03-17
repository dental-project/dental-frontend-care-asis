import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_BANK = 'READ_BANK';

// action creators
const readBank = createAction(READ_BANK, (data) => ({ data }));

// initialState
const initialState = {
  data: []
};

const getBankMiddleware = () => {
  return (dispatch) => {
    apis
      .getBank()
      .then((result) => {        
        const bankData = result.data;
        dispatch(readBank(bankData));
      })
      .catch((err) => {
        alert(err);
      });
  };
}

// reducer
export default handleActions(
  {
    [READ_BANK]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
  },
  initialState
);

const banks = {
    getBankMiddleware,
};

export { banks };
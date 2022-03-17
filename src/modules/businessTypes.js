import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_BUSINESSTYPE = 'READ_BUSINESSTYPE';

// action creators
const readBusinessType = createAction(READ_BUSINESSTYPE, (data) => ({ data }));

// initialState
const initialState = {
  data: []
};

const getBusinessTypeMiddleware = () => {
  return (dispatch) => {
    apis
      .getBusinessType()
      .then((result) => {        
        const businessTypeData = result.data;
        dispatch(readBusinessType(businessTypeData));
      })
      .catch((err) => {
        alert(err);
      });
    };
}

// reducer
export default handleActions(
  {
    [READ_BUSINESSTYPE]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
  },
  initialState
);

const businessTypes = {
  getBusinessTypeMiddleware,
};

export { businessTypes };
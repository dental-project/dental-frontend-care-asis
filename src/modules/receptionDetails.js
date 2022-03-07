import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "apis/axios";

// action 생성
const READ_RECEPTION_DETAIL = "READ_RECEPTION_DETAIL";

// action creators
const readReceptionDetail = createAction(READ_RECEPTION_DETAIL, data => ({ data}));

// initialState
const initialState = {
  data: [],
  count: 0,
};

// middleware
const getReceptionDetailMiddleware = () => {
  return dispatch => {
    apis
      .getReceptionDetail()
      .then(result => {
        const receptionDetailData = result.data;
        dispatch(readReceptionDetail(receptionDetailData));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [READ_RECEPTION_DETAIL]: (state, action) =>
      produce(state, draft => {
        draft.data = action.payload.data;
      }),
  },
  initialState
);

const receptionDetails = {
  getReceptionDetailMiddleware,
};

export { receptionDetails };

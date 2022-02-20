import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_BUSINESSSECTOR = 'READ_BUSINESSSECTOR';

// action creators
const readBusinessSector = createAction(READ_BUSINESSSECTOR, (data) => ({ data }));

// initialState
const initialState = {
  data: []
};

const getBusinessSectorMiddleware = () => {
    return (dispatch) => {
        apis
          .getBusinessSector()
          .then((result) => {        
           
            const businessSectorData = result.data;
            dispatch(readBusinessSector(businessSectorData));
          })
          .catch((err) => {
            console.error(err);
          });
      };
}

// reducer
export default handleActions(
  {
    [READ_BUSINESSSECTOR]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),

  },
  initialState
);

const businessSectors = {
  getBusinessSectorMiddleware,
};

export { businessSectors };

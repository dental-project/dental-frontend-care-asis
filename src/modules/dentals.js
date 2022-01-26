import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { apis } from 'apis/axios'

// action 생성
const READ_DENTAL = 'READ_DENTAL';
const ADD_DENTAL = 'ADD_DENTAL';
const UPDATE_DENTAL = 'UPDATE_DENTAL';
const REMOVE_DENTAL = 'REMOVE_DENTAL';
const READ_BUSINESSTYPE = 'READ_BUSINESSTYPE';
const READ_BUSINESSSECTOR = 'READ_BUSINESSSECTOR';

// action creators
const readDental = createAction(READ_DENTAL, (data) => ({ data }));
const addDental = createAction(ADD_DENTAL, (data) => ({ data }));
const updateDental = createAction(UPDATE_DENTAL, (data) => ({ data }));
const removeDental = createAction(REMOVE_DENTAL, (data) => ({ data }));
const readBusinessType = createAction(READ_BUSINESSTYPE, (data) => ({ data }));
const readBusinessSector = createAction(READ_BUSINESSSECTOR, (data) => ({ data }));

// initialState
const initialState = {
  data: [],
  loading: false,
  modal: "false",
  err: null
};

// middleware
const getDentalMiddleware = () => {
  return (dispatch) => {
    apis
      .getDental()
      .then((result) => {        
        const dentalData = result.data;
        //console.log(dentalData);
        dispatch(readDental(dentalData));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const addDentalMiddleware = (contents) => {
  return (dispatch) => {
    apis
      .createDental(contents)
      .then((result) => {
        dispatch(addDental(contents));
        alert("장치를 추가 하였습니다.");
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const updateDentalMiddleware = (seqId, contents) => {
  return (dispatch) => {
    apis
      .patchDental(seqId, contents)
      .then((result) => {

        const data = { seq_id: seqId, contents: contents }

        dispatch(updateDental(data));
        alert("장치를 수정 했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const deleteDentalMiddleware = (seqId) => {
  return (dispatch) => {
    apis
      .deleteDental(seqId)
      .then((result) => {
        dispatch(removeDental(seqId));
        alert("파트명을 삭제 했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [READ_DENTAL]: (state, action) =>
      produce(state, (draft) => {
        draft.data = action.payload.data;
      }),
    [ADD_DENTAL]: (state, action) =>
      produce(state, (draft) => {
        draft.data.push(action.payload.data);
      }),
    
    [UPDATE_DENTAL]: (state, action) => {(
      state.data.map((seq_id) => {
        if(seq_id === action.payload.data.contents.seq_id) {
          //console.log(state.seq_id);
        }
      })
    )},
    
    [REMOVE_DENTAL]: (state, action) =>
      produce(state, (draft) => {
        draft.data = []
    }),
    // produce(state, (draft) => {
     
    //   }),

  },
  initialState
);

const dentals = {
  getDentalMiddleware,
  addDentalMiddleware,
  updateDentalMiddleware,
  deleteDentalMiddleware,
};

export { dentals };

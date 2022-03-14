import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "apis/axios";
import axios from 'axios';
// action 생성
const READ_RECEPTION = "READ_RECEPTION";
const READ_VENDOR_PART = "READ_VENDOR_PART";
const ADD_RECEPTION = "ADD_RECEPTION";
const ADD_RECEPTION_PRICE = "ADD_RECEPTION_PRICE";
const UPDATE_RECEPTION = "UPDATE_RECEPTION";
const REMOVE_RECEPTION = "REMOVE_RECEPTION";
//const REMOVE_RECEPTION_DETAIL = "REMOVE_RECEPTION_DETAIL";

// action creators
const readReception = createAction(READ_RECEPTION, data => ({ data }));
const readVendorPart = createAction(READ_VENDOR_PART, data => ({ data }));
const addReception = createAction(ADD_RECEPTION, data => ({ data }));
const addReceptionPrice = createAction(ADD_RECEPTION_PRICE, data => ({ data }));
const updateReception = createAction(UPDATE_RECEPTION, data => ({ data }));
//const updateReceptionDetail = createAction(UPDATE_RECEPTION_DETAIL, data => ({ data }));
const removeReception = createAction(REMOVE_RECEPTION, data => ({ data }));
//const removeReceptionDetail = createAction(REMOVE_RECEPTION_DETAIL, data => ({ data }));

// initialState
const initialState = {
  data: [],
  count: 0,
};

// middleware
const getReceptionMiddleware = () => {
  return dispatch => {
    apis
      .getReception()
      .then(result => {
        const receptionData = result.data;
        dispatch(readReception(receptionData));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const getVendorPartMiddleware = seqId => {
  return dispatch => {
    apis
      .getSelectVendorPart(seqId)
      .then(result => {
        console.log(result);
        const vendorPartData = result.data;
        dispatch(readVendorPart(vendorPartData));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const addReceptionMiddleware = (data) => {
  return dispatch => {
    apis
      .createReception(data)
      .then(result => {
        if(result.status=="ERROR"){
          alert(result.message)
        }else{
          dispatch(addReception(data));
  
          alert("접수 정보를 추가 하였습니다.");
        }
        // for(let i=0; i<priceContents.length; i++) {
        //   priceContents[i].sell_master_id = result.data.seq_id
        // };
        
        // dispatch(addReceptionPriceMiddleware(priceContents));

      })
      .catch(err => {
        console.error(err);
      });
  };
};

const addReceptionPriceMiddleware = contents => {
  return dispatch => {
    apis
      .createReceptionPrice(contents)
      .then(result => {
        dispatch(addReceptionPrice(contents));
        alert("접수 정보를 추가 하였습니다.2");
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const updateReceptionMiddleware = (seqId, contents) => {
  return dispatch => {
    apis
      .patchPart(seqId, contents)
      .then(result => {
        const data = { seq_id: seqId, contents: contents };

        dispatch(updateReception(data));
        alert("접수 정보를 수정 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const deleteReceptionMiddleware = seqId => {
  return dispatch => {
    apis
      .deleteReception(seqId)
      .then(result => {
        console.log(result);
        dispatch(removeReception(seqId));
        alert("접수 정보를 삭제 했습니다.");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// const deleteReceptionDetailMiddleware = seqId => {
//   return dispatch => {
//     apis
//       .deleteReceptionDetail(seqId)
//       .then(result => {
//         dispatch(removeReceptionDetail(seqId));
//         alert("접수 단가를 삭제 했습니다.");
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
// }


// 나중에 손봐야 함
// reducer
export default handleActions(
  {
    [READ_RECEPTION]: (state, action) =>
      produce(state, draft => {
        draft.data = action.payload.data;
      }),
    [READ_VENDOR_PART]: (state, action) =>
      produce(state, draft => {
        draft.data = action.payload.data;
      }),
    [ADD_RECEPTION]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [UPDATE_RECEPTION]: state =>
      produce(state, draft => {
        draft.count = draft.count + 1;
      }),
    [REMOVE_RECEPTION]: (state, action) =>
      produce(state, draft => {
        const index = draft.data.findIndex(
          element => element.seq_id === action.payload.seqId
        );
        draft.data.splice(index, 1);
        draft.count = draft.count + 1;
      }),
    // [REMOVE_RECEPTION_DETAIL]: (state, action) =>
    //   produce(state, draft => {
    //     const index = draft.data.findIndex(
    //       element => element.seq_id === action.payload.seqId
    //     );
    //     draft.data.splice(index, 1);
    //     draft.count = draft.count + 1;
    //   }),
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
  //deleteReceptionDetailMiddleware,
};

export { receptions };

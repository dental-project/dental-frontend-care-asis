import { AXIOS_PART_REQUEST, AXIOS_PART_SUCCESS, AXIOS_PART_FAILURE } from './types'

const part = {
    items: [],
    loading: false,
    err: null
}

const partsReducer = (state=part, action) => {
    switch(action.type) {
        case AXIOS_PART_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case AXIOS_PART_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
            }
        case AXIOS_PART_FAILURE:
            return {
                ...state,
                err: action.payload,
                loading: false,
            }
        default: return state;
    }
        
}

export default partsReducer
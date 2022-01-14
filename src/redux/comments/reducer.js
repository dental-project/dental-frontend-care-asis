import { FETCH_COMMENTS, FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS, FETCH_COMMENTS_FAILURE } from './types'

const comment = {
    items: []
}

const commentsReducer = (state=comment, action) => {
    switch(action.type) {
        default: return state;
    }
        
}


export default commentsReducer
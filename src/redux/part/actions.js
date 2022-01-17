import { AXIOS_PART_REQUEST, AXIOS_PART_SUCCESS, AXIOS_PART_FAILURE } from './types'

const axiosPartRequest = () => {
    return {
        type: AXIOS_PART_REQUEST
    }
}

const axiosPartSuccess = (parts) => {
    return {
        type: AXIOS_PART_SUCCESS,
        payload: parts
    }
}

const axiosPartFailure = (error) => {
    return {
        type: AXIOS_PART_FAILURE,
        payload: error
    }
}

export const fetchComments = () => {
    return (dispatch) => {
        dispatch(axiosPartRequest())
        fetch("http://localhost:8000/api/code/part/")
            .then(response => response.json())
            .then(parts => 
                dispatch(axiosPartSuccess(parts)))
            .catch(error => dispatch(axiosPartFailure(error)))
    }
}
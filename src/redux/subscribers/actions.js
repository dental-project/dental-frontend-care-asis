import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from './types'

export const addSubscriber = (number) => {
    return {
        type: ADD_SUBSCRIBER,
        payload: Number(number)
    }
}

export const removeSubscriber = () => {
    return {
        type: REMOVE_SUBSCRIBER
    }
}

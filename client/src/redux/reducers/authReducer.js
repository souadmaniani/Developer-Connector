import { ActionTypes } from '../constants/actionTypes';
import { isEmpty } from '../../utils/isEmpty'
let initialState = {
    isAuthentified: false,
    user: {}
}

export const authReducer = (state = initialState, { type, payload })=> {
    switch(type) {
        case ActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthentified: !isEmpty(payload),
                user: payload
            }
        default:
            return state;
    }
}
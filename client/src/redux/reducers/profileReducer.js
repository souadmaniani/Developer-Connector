import { ActionTypes } from '../constants/actionTypes';
let initialState = {
    profile: null,
    loading: true
}

export const profileReducer = (state = initialState, { type, payload })=> {
    switch(type) {
        case ActionTypes.GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            } 
        case ActionTypes.PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        // case ActionTypes.PROFILE_NOT_FOUND:
        //     return {
        //         ...state,
                
        //     }
        default:
            return state;
    }
}
import { ActionTypes } from '../constants/actionTypes';
let initialState = {
    profile: null,
    profiles: null,
    loading: true
}

export const profileReducer = (state = initialState, { type, payload })=> {
    switch(type) {
        case ActionTypes.PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case ActionTypes.GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            } 
        case ActionTypes.GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            } 
        case ActionTypes.CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case ActionTypes.CREATE_PROFILE:
            return {
                ...state,
                profile: payload
            }
        
        // case ActionTypes.PROFILE_NOT_FOUND:
        //     return {
        //         ...state,
                
        //     }
        default:
            return state;
    }
}
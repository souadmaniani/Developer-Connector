import { ActionTypes } from '../constants/actionTypes';
import axios from 'axios';

// GET_PROFILE
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get("http://localhost:5000/api/profile")
	.then((res)=> {
		console.log("RES====> ", res);
		dispatch({
			type: ActionTypes.GET_PROFILE,
			payload: res.data
		})
	})
	.catch((err)=> {
		console.log("err===>",err);
		return {
			type: ActionTypes.GET_PROFILE,
			payload: {}
		}
	})
}

// pRODILE LOADING
export const setProfileLoading = () => {
    return ({
		type: ActionTypes.PROFILE_LOADING,
	})
}

// CLEAR_CURRENT_PROFILE
export const clearCurrentProfile = () => {
	return ({
		type: ActionTypes.CLEAR_CURRENT_PROFILE
	})
}
// // GET_PROFILE
// export const profileNotFound = () => dispatch => {
     
// }

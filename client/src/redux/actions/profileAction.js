import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

// GET_PROFILE
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(process.env.REACT_APP_PROFILE_ENDPOINT)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.GET_PROFILE,
        payload: {},
      });
    });
};

// PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: ActionTypes.PROFILE_LOADING,
  };
};

// CLEAR_CURRENT_PROFILE
export const clearCurrentProfile = () => {
  return {
    type: ActionTypes.CLEAR_CURRENT_PROFILE,
  };
};

// CREATE PROFILE
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_PROFILE_ENDPOINT, profileData)
    .then(() => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// ADD EXPERIENCE
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_EXPERIENCE_ENDPOINT, expData)
    .then(() => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// ADD EDUCATION
export const addEducation = (expData, history) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_EDUCATION_ENDPOINT, expData)
    .then(() => history.push("/dashboard"))
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// DELETE EXPERIENCE
export const deleteExperience = (id) => (dispatch) => {
	if (window.confirm("Are you sure, You want delete the item ?")) {
	  axios
		.delete(process.env.REACT_APP_EXPERIENCE_ENDPOINT + `/${id}`)
		.then((res) => dispatch({
		  type: ActionTypes.GET_PROFILE,
		  payload: res.data
		}))
		.catch((err) => {
		  dispatch({
			type: ActionTypes.GET_PROFILE,
			payload: err.response.data
		  });
		});
	}
  };

// DELETE EDUCATION
export const deleteEducation = (id) => (dispatch) => {
	if (window.confirm("Are you sure, You want delete the item ?")) {
		axios
		.delete(process.env.REACT_APP_EDUCATION_ENDPOINT + `/${id}`)
		.then((res) => dispatch({
			type: ActionTypes.GET_PROFILE,
			payload: res.data
		}))
		.catch((err) => {
			dispatch({
			type: ActionTypes.GET_PROFILE,
			payload: err.response.data
			});
		});
	}
};

// DELETE ACCOUNT
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure, You want delete the item ?")) {
    axios
      .delete(process.env.REACT_APP_PROFILE_ENDPOINT)
      .then(() => {
        dispatch({
          type: ActionTypes.SET_CURRENT_USER,
          payload: {},
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.GET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};

// GET PROFILES
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get(process.env.REACT_APP_PROFILES_ENDPOINT)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_PROFILES,
        payload: res.data,
      });
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.GET_PROFILES,
        payload: {},
      });
    });
};

// profileNotFound
// export const profileNotFound = () => dispatch => {

// }

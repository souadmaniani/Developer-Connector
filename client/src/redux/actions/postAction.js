import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

// ADD POST
export const addPost = (postData) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_POST_ENDPOINT, postData)
    .then((res) =>
      dispatch({
        type: ActionTypes.ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// GET POSTS
export const getPosts = () => (dispatch) => {
  axios
    .get(process.env.REACT_APP_POST_ENDPOINT)
    .then((res) =>
      dispatch({
        type: ActionTypes.GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// POST LOADING
export const setPostLoading = () => {
  return {
    type: ActionTypes.POST_LOADING,
  };
};

// DELETE POST
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(process.env.REACT_APP_POST_ENDPOINT + `/${postId}`)
    .then(() =>
      dispatch({
        type: ActionTypes.DELETE_POST,
        payload: postId,
      })
    )
    .catch((err) =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// LIKE POST
export const likePost = (postId) => (dispatch) => {
  console.log(process.env.REACT_APP_POST_ENDPOINT + `/like/${postId}`);
  axios
    .post(process.env.REACT_APP_POST_ENDPOINT + `/like/${postId}`)
    .then(() => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// UNLIKE POST
export const unlikePost = (postId) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_POST_ENDPOINT + `/unlike/${postId}`)
    .then(() => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

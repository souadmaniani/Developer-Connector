import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

// ADD POST
export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());

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

// GET POST
export const getPost = (postId) => (dispatch) => {
  axios
    .get(process.env.REACT_APP_POST_ENDPOINT + `/${postId}`)
    .then((res) =>
      dispatch({
        type: ActionTypes.GET_POST,
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

// ADD COMMENT
export const addComment = (commentData, postId) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(
      process.env.REACT_APP_POST_ENDPOINT + `/comment/${postId}`,
      commentData
    )
    .then(() => dispatch(getPost(postId)))
    .catch((err) =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// DELETE COMMENT
export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(
      process.env.REACT_APP_POST_ENDPOINT + `/comment/${postId}/${commentId}`
    )
    .then(() => dispatch(getPost(postId)))
    .catch((err) =>
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const clearErrors = () => {
  return {
    type: ActionTypes.CLEAR_ERRORS,
  };
};

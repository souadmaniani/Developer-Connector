import { ActionTypes } from '../constants/actionTypes';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode'

// Register User
export const registerUser = (userData, history) => dispatch => {
        axios.post(process.env.REACT_APP_REGISTER_ENDPOINT, userData)
        .then(()=> history.push('/login'))
        .catch(err => {
            dispatch({
                type: ActionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })
}

// Login - Get User token
export const loginUser = userData => dispatch => {
        axios.post(process.env.REACT_APP_LOGIN_ENDPOINT, userData)
        .then((res)=>{
            const { token } = res.data;
            // save token to local storage
            localStorage.setItem('jwttoken', token);
            // set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: ActionTypes.GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const setCurrentUser = (decoded) => {
    return ({
        type: ActionTypes.SET_CURRENT_USER,
        payload: decoded
    })
}

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local Storage
    localStorage.removeItem('jwttoken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} (isAuthenticated: false)
    dispatch(setCurrentUser({}))

}
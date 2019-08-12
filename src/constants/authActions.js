// eslint-disable-next-line
/*eslint jsx-quotes: ["error", "prefer-double"]*/
/*
  This file is a part of Appolus
  Author: Angel Labrada Mass贸
 */

// ===============================================================
// Import Modules
// ===============================================================
import axios from "axios"
import setAuthToken from "../util/setAuthToken"
import jwt_decode from "jwt-decode"

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./actionTypes"

// Register User
export const signUpUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => history.push("/signin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add User
export const additionateUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/add", userData)
    .then(res => history.push("/app/users/add"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login - get user token
export const SignInUser = userData => dispatch => {
  axios
    .post("/api/users/signin", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data
      localStorage.setItem("jwtToken", token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}

import * as fetch from 'node-fetch';
import serverURL from '../constants/serverURL';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../constants/actionTypes';

export function logout() {
  return { type: LOGOUT };
}

export function login(userId, password) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });

    try {
      // Authorize the user from the server
      const response = await fetch(`${serverURL}/login`, {
        method: 'post',
        body: JSON.stringify({ id: userId, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const json = await response.json();

      // Handle login fail
      const { id, user_success: userSuccess, auth_success: authSuccess } = json;
      if (!userSuccess) {
        console.log(`User ${id} not found.`);
        dispatch({ type: LOGIN_FAIL });
        return;
      }
      if (!authSuccess) {
        console.log('Incorrect password.');
        dispatch({ type: LOGIN_FAIL });
        return;
      }

      // Handle login success
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { id },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL });
    }
  };
}

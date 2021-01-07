import * as fetch from 'node-fetch';
import serverURL from '../constants/serverURL';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../constants/actionTypes';

export function logout() {
  localStorage.removeItem('userId');
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
      const { id, user_success: userSuccess } = json;

      // Handle login fail
      if (response.status === 401) {
        const message = userSuccess
          ? 'Incorrect password'
          : `User ${id} not found.`;
        console.log(message);
        localStorage.removeItem('userId');
        dispatch({ type: LOGIN_FAIL });
        return;
      }

      // Handle login success
      localStorage.setItem('userId', id);
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

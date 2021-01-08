import { requestLogin, requestRegister } from './requests';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
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
      const response = await requestLogin(userId, password);
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

export function register(userId, password, name) {
  return async (dispatch) => {
    dispatch({ type: REGISTER });

    try {
      // Send user info to the server
      const response = await requestRegister(userId, password, name);

      // Handle register fail
      if (response.status !== 200) {
        console.log('Registration Failed');
        dispatch({ type: REGISTER_FAIL });
        return;
      }

      // Handle register success
      dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({ type: REGISTER_FAIL });
    }
  };
}

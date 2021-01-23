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

export function login(email, password) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });

    try {
      // Authorize the user from the server
      const response = await requestLogin(email, password);
      const json = await response.json();
      const { user_id: userId, user_success: userSuccess } = json;

      // Handle login fail
      if (response.status === 401) {
        const message = userSuccess
          ? 'Incorrect password'
          : `Email ${email} not found.`;
        console.log(message);
        localStorage.removeItem('userId');
        dispatch({ type: LOGIN_FAIL });
        return;
      }

      // Handle login success
      localStorage.setItem('userId', userId);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { userId },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL });
    }
  };
}

export function register(email, userId, password, name) {
  return async (dispatch) => {
    dispatch({ type: REGISTER });

    try {
      // Send user info to the server
      const response = await requestRegister(email, userId, password, name);
      const json = await response.json();

      // Handle register fail
      if (response.status === 401) {
        console.log('Registration Failed');
        console.log(json);
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

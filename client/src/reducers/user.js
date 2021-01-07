import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../constants/actionTypes';

// Logged-out user
const defaultState = {
  id: null,
  logging_in: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        logging_in: true,
      };
    }
    case LOGIN_SUCCESS: {
      const { id } = action.payload;
      return {
        id,
        logging_in: false,
      };
    }
    case LOGIN_FAIL:
    case LOGOUT: {
      return {
        id: null,
        logging_in: false,
      };
    }
    default:
      return state;
  }
};

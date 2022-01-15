import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  CLEAR_ERROR,
  LOAD_USER,
  LOAD_AUTH
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case LOAD_AUTH:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        error: null,
        loading: false
      };
    case LOAD_USER:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        loading: false,
        error: null
      };
    case LOGOUT:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: null,
        error: action.payload,
        loading: true,
        token: null,
        user: null
      };

    default:
      return {
        ...state
      };
  }
};

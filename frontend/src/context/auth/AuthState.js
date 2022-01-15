import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  CLEAR_ERROR,
  LOAD_USER,
  LOAD_AUTH
} from '../types';

import setAuthToken from '../../components/utils/setAuthToken';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  };

  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  const loadAuth = async () => {
    if (localStorage.token) {
      const token = localStorage.token;
      setAuthToken(token);

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/auth/load`
        );

        if (!res.data.response.token) {
          setAuthToken(null);
          dispatch({ type: AUTH_ERROR, payload: 'Lỗi xác thực' });
          return false;
        }

        if (res.data.response.token !== token) {
          dispatch({
            type: AUTH_ERROR,
            payload: 'Tài khoản hết hạn truy cập!'
          });
          setAuthToken(null);
          return false;
        }

        if (res.status === 401 || res.status === 500) {
          dispatch({
            type: AUTH_ERROR,
            payload: 'Tài khoản hết hạn truy cập!'
          });
          setAuthToken(null);
          return false;
        }

        setAuthToken(token);
        dispatch({ type: LOAD_AUTH, payload: res.data.response });
        return true;
      } catch (err) {
        setAuthToken(null);
        dispatch({ type: AUTH_ERROR, payload: err.response.data.response });
        return false;
      }
    }

    setAuthToken(null);
    dispatch({ type: AUTH_ERROR });
    return false;
  };

  const loadUser = async () => {
    if (!loadAuth()) {
      dispatch({ type: AUTH_ERROR, payload: 'Tài khoản hết hạn truy cập!' });
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/load`
      );

      dispatch({ type: LOAD_USER, payload: res.data.response });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.response });
    }
  };

  const login = async (formData) => {
    clearError();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        formData,
        config
      );

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.response });
      loadAuth();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.response });
    }
  };

  const register = async (formData) => {
    clearError();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        formData,
        config
      );

      dispatch({ type: REGISTER_SUCCESS, payload: res.data.response });
      loadAuth();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.response });
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`);
      dispatch({ type: LOGOUT });
      loadAuth();
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.response });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        login,
        register,
        logout,
        clearError,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

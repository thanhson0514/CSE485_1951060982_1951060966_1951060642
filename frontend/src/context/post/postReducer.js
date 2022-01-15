import {
  GET_ALL_POST,
  CREATE_POST,
  DELETE_POST,
  ERROR_POST,
  LOAD_POST,
  CLEAR_POST,
  UPDATE_POST
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POST:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case CREATE_POST:
      return {
        ...state,
        loading: false,
        post: payload,
        error: null
      };
    case GET_ALL_POST:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case UPDATE_POST:
      return {
        ...state,
        post: payload
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        error: null,
        msg: payload
      };
    case CLEAR_POST:
      return {
        ...state,
        post: '',
        error: null,
        msg: null,
        loading: false
      };
    case ERROR_POST:
      return {
        ...state,
        posts: null,
        loading: true,
        post: null,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};

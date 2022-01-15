import {
  GET_ALL_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  LOAD_COMMENT,
  ERROR_COMMENT,
  UPDATE_COMMENT,
  CLEAR_COMMENT
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_COMMENT:
    case GET_ALL_COMMENT:
      return {
        ...state,
        comments: [...payload],
        errorCmt: null
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comment: payload,
        errorCmt: null
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: payload,
        errorCmt: null
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comment: payload,
        errorCmt: null
      };

    case ERROR_COMMENT:
      return {
        ...state,
        comments: null,
        msg: null,
        errorCmt: true,
        comment: null,
        loading: true
      };
    case CLEAR_COMMENT:
      return {
        ...state,
        comment: null,
        errorCmt: null,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

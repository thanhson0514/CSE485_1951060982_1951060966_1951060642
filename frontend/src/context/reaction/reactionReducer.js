import {
  GET_REACTION,
  DELETE_REACTION,
  ERROR_REACTION,
  CREATE_REACTION
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REACTION:
      return {
        ...state,
        reactions: payload,
        countReact: payload.length,
        errorReact: null
      };
    case CREATE_REACTION:
      return {
        ...state,
        reaction: payload,
        errorReact: null
      };
    case DELETE_REACTION:
      return {
        ...state,
        reaction: payload,
        errorReact: null
      };
    case ERROR_REACTION:
      return {
        ...state,
        reactions: null,
        errorReact: true,
        countReact: 0
      };
    default:
      return {
        ...state
      };
  }
};

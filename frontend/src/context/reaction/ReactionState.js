import React, { useReducer } from 'react';
import axios from 'axios';

import ReactionContext from './reactionContext';
import ReactionReducer from './reactionReducer';
import {
  CREATE_REACTION,
  ERROR_REACTION,
  GET_REACTION,
  DELETE_REACTION
} from '../types';

const ReactionState = (props) => {
  const initialState = {
    reactions: null,
    errorReact: null,
    countReact: 0,
    reaction: null
  };

  const [state, dispatch] = useReducer(ReactionReducer, initialState);

  const getReactions = async (id_post) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id_post}/reactions`
      );

      dispatch({ type: GET_REACTION, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_REACTION });
    }
  };

  const createReaction = async (id_post) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id_post}/reaction`
      );

      dispatch({ type: CREATE_REACTION, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_REACTION });
    }
  };

  const deleteReaction = async (id_post) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id_post}/reaction`
      );

      dispatch({ type: DELETE_REACTION, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_REACTION });
    }
  };

  return (
    <ReactionContext.Provider
      value={{
        reactions: state.reactions,
        countReact: state.countReact,
        reaction: state.reaction,
        getReactions,
        createReaction,
        deleteReaction
      }}
    >
      {props.children}
    </ReactionContext.Provider>
  );
};

export default ReactionState;

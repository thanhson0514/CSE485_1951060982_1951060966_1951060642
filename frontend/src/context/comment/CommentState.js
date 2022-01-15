import React, { useReducer } from 'react';
import axios from 'axios';

import CommentContext from './commentContext';
import CommentReducer from './commentReducer';
import {
  GET_ALL_COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  // LOAD_COMMENT,
  ERROR_COMMENT,
  CLEAR_COMMENT
} from '../types';

const CommentState = (props) => {
  const initialState = {
    loading: true,
    errorCmt: null,
    comments: null,
    comment: null,
    msg: ''
  };

  const [state, dispatch] = useReducer(CommentReducer, initialState);
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  };

  const loadComment = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id}/comments`
      );

      dispatch({ type: GET_ALL_COMMENT, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_COMMENT });
    }
  };

  const getAllComments = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id}/comments`
      );

      dispatch({ type: GET_ALL_COMMENT, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_COMMENT, payload: err.response.data.response });
    }
  };

  const createComment = async (id, form) => {
    try {
      const formData = new FormData();
      formData.append('content', form['contentCmt']);
      formData.append('image', form['image']);

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id}/comment`,
        formData,
        config
      );

      dispatch({ type: CREATE_COMMENT, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_COMMENT });
    }
  };

  const updateComment = async (id_post, id_cmt, form) => {
    try {
      const formData = {};
      if (form['imageFile']) formData['image'] = form['imageFile'];
      if (form['contentCmt']) formData['content'] = form['contentCmt'];

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id_post}/comment/${id_cmt}`,
        formData,
        config
      );

      dispatch({ type: UPDATE_COMMENT, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_COMMENT });
    }
  };

  const deleteComment = async (id_post, id_cmt) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id_post}/comment/${id_cmt}`,
        config
      );

      dispatch({ type: DELETE_COMMENT, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_COMMENT });
    }
  };

  const clearComment = () => {
    dispatch({ type: CLEAR_COMMENT });
  };

  return (
    <CommentContext.Provider
      value={{
        errorCmt: state.errorCmt,
        comments: state.comments,
        msg: state.msg,
        comment: state.comment,
        getAllComments,
        createComment,
        loadComment,
        deleteComment,
        updateComment,
        clearComment
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;

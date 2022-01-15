import React, { useReducer } from 'react';
import axios from 'axios';

import PostContext from './postContext';
import PostReducer from './postReducer';
import {
  GET_ALL_POST,
  CREATE_POST,
  DELETE_POST,
  ERROR_POST,
  LOAD_POST,
  CLEAR_POST,
  UPDATE_POST
} from '../types';
import {
  generateBase64FromImage,
  blobToBase64
} from '../../components/utils/convertImage';

const PostState = (props) => {
  const initialState = {
    loading: true,
    error: null,
    posts: null,
    post: null,
    msg: ''
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const loadPost = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v0/posts`
      );

      dispatch({ type: LOAD_POST, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_POST });
    }
  };

  const getAllPost = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v0/posts`
      );

      dispatch({ type: GET_ALL_POST, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_POST, payload: err.response.data.response });
    }
  };

  const createPost = async (form) => {
    try {
      const formData = new FormData();

      formData.append('content', form['content']);
      for (let image in form['uploads']) {
        formData.append('imgUrl[]', form['uploads'][image]);
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post`,
        formData,
        config
      );

      dispatch({ type: CREATE_POST, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_POST });
    }
  };

  const updatePost = async (id_post, form) => {
    try {
      const formData = {};
      const images = [];

      for (let i = 0; i < form['images'].length; ++i) {
        if ('File' in window && form['images'][i] instanceof File) {
          const b64 = await getBase64(form['images'][i]);
          images.push(await b64);
        } else {
          images.push(form['images'][i]);
        }
      }

      formData['images'] = images;
      formData['content'] = form['content'];

      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id_post}`,
        formData,
        config
      );

      dispatch({ type: UPDATE_POST, payload: res.data.response });
    } catch (err) {
      dispatch({ type: ERROR_POST });
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/v0/post/${id}`
      );

      dispatch({ type: DELETE_POST, payload: res.data.response });
    } catch (error) {
      dispatch({ type: ERROR_POST });
    }
  };

  const clearPost = () => {
    dispatch({ type: CLEAR_POST });
  };

  return (
    <PostContext.Provider
      value={{
        error: state.error,
        posts: state.posts,
        getAllPost,
        createPost,
        loadPost,
        deletePost,
        updatePost,
        clearPost,
        msg: state.msg,
        post: state.post
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;

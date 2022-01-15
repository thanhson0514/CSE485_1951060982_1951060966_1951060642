import React, { useState, useContext, useEffect, useRef } from 'react';
import { Avatar, IconButton } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';

import authContext from '../../context/auth/authContext';
import commentContext from '../../context/comment/commentContext';
import useStyles from './formComment.style';

const FormComment = ({ id_post, avatar }) => {
  const [contentCmt, setContentCmt] = useState('');
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const classes = useStyles();
  const ref = useRef();

  const { loadUser } = useContext(authContext);
  const { createComment, loadComment, errorCmt, comment } =
    useContext(commentContext);

  useEffect(() => {
    loadComment(id_post);
    if (errorCmt) loadUser();
    // eslint-disable-next-line
  }, [success, errorCmt, comment]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createComment(id_post, { contentCmt, image });
      e.target.value = '';
      setImage(null);
      setContentCmt('');
      ref.current.value = '';
      setSuccess(true);
    }
  };

  const onChange = (e) => {
    setContentCmt(e.target.value);
  };

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = (e) => {
    setImage(null);
  };

  return (
    <div className={classes.formCommentContainer}>
      <div className={classes.commentContainer}>
        <Avatar
          src={`${process.env.REACT_APP_BASE_URL_IMG}${avatar}`}
          className="avatar"
        />
        <div className="icon">
          <input
            accept="image/*"
            id={`icon-button-file-fc-${id_post}`}
            type="file"
            name="imgUrl"
            style={{ display: 'none' }}
            onChange={onChangeFile}
            ref={ref}
          />
          <label htmlFor={`icon-button-file-fc-${id_post}`}>
            <IconButton color="primary" component="span">
              <InsertPhotoIcon fontSize="large" />
            </IconButton>
          </label>
        </div>
        <input
          className="input"
          autocomplete="off"
          placeholder="Viết bình luận"
          name="content"
          onChange={onChange}
          value={contentCmt}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className={classes.formCommentImage}>
        {!!image && (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt=""
              id={`icon-button-file-fc-${id_post}`}
            />
            <IconButton onClick={removeImage}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default FormComment;

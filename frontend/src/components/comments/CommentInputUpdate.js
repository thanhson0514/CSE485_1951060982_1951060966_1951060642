import React, { useState, useContext, useEffect, useRef } from 'react';
import { Avatar, IconButton } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';

import commentContext from '../../context/comment/commentContext';
import authContext from '../../context/auth/authContext';
import useStyles from './comments.style';

const CommentInputUpdate = ({
  id_post,
  avatar,
  content,
  imgUrl,
  id_cmt,
  setOpenInput
}) => {
  const [contentCmt, setContentCmt] = useState(content);
  const [isTypeFile, setIsTypeFile] = useState(false);
  const [image, setImage] = useState(imgUrl);
  const [imageFile, setImageFile] = useState(null);
  const classes = useStyles();
  const ref = useRef();

  const { loadUser } = useContext(authContext);
  const { updateComment, loadComment, errorCmt, comment, clearComment } =
    useContext(commentContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (errorCmt) {
      loadUser();
    }
    if (comment) {
      setContentCmt('');
      setImage([]);
      setImageFile(null);
      setIsTypeFile(false);
      loadComment(id_post);
      setOpenInput(false);
      clearComment();
      ref.current.value = '';
    }

    // eslint-disable-next-line
  }, [comment]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!contentCmt) return;
      updateComment(id_post, id_cmt, { contentCmt, imageFile });
    }
  };

  const onChange = (e) => {
    setContentCmt(e.target.value);
  };

  const onChangeFile = (e) => {
    if (!e.target.files[0]) return;
    setIsTypeFile(true);
    setImage(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setImageFile(e.target.files[0]);
  };

  const removeImage = (e) => {
    setImage(null);
    ref.current.value = '';
    setIsTypeFile(true);
  };
  
  return (
    <div className={classes.containerInput}>
      <div className={classes.commentInputContainer}>
        <Avatar
          src={`${process.env.REACT_APP_BASE_URL_IMG}${avatar}`}
          className="avatar"
        />
        <div className="icon">
          <input
            ref={ref}
            accept="image/*"
            id="icon-button-file-update"
            type="file"
            name="imgUrl"
            style={{ display: 'none' }}
            onChange={onChangeFile}
          />
          <label htmlFor="icon-button-file-update">
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
          onKeyPress={handleKeyPress}
          value={contentCmt}
        />
      </div>
      <div className={classes.formCommentImage}>
        {!!image?.length && (
          <>
            <img
              src={`${
                !isTypeFile
                  ? `${process.env.REACT_APP_BASE_URL_IMG}${image}`
                  : image
              }`}
              alt=""
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

export default CommentInputUpdate;

import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  DialogActions,
  Button
} from '@mui/material';
import FbImageLibrary from 'react-fb-image-grid';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import postContext from '../../context/post/postContext';
import styles from './modalFormPost.style';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, textAlign: 'center', fontSize: '20px' }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

const ModalFormPost = (props) => {
  const {
    id_post = '',
    isEditPost = false,
    open,
    setOpen,
    contentPost = '',
    imgUrl = []
  } = props;
  const [images, setImages] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [content, setContent] = useState('');
  const [urlImages, setUrlImages] = useState([...imgUrl]);

  const ref = useRef();
  const { post, createPost, loadPost, error, updatePost, clearPost } =
    useContext(postContext);
  const classes = styles();

  useEffect(() => {
    loadPost();

    if (isEditPost) {
    }

    if (!error && post) {
      setOpen(false);
      setUploads([]);
      setContent('');
      setImages([]);
      clearPost();
    }
    setImages([
      ...imgUrl.map((url) => `${process.env.REACT_APP_BASE_URL_IMG}${url}`)
    ]);

    setUploads([]);
    setContent(contentPost);
    if (ref.current) ref.current.value = '';
    // eslint-disable-next-line
  }, [post, error]);

  const onClick = () => {
    if (!isEditPost) createPost({ content, uploads });
    else updatePost(id_post, { images: [...uploads, ...urlImages], content });
  };

  const onChange = (e) => {
    const img = [];
    const up = [];
    for (let file of e.target.files) {
      up.push(file);
      img.push(URL.createObjectURL(file));
    }

    setUploads([...uploads, ...up]);
    setImages([...images, ...img]);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveImages = () => {
    setUploads([]);
    setImages([]);
    setUrlImages([]);
    ref.current.value = '';
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Tạo bài viết
        </BootstrapDialogTitle>
        <DialogContent dividers className={classes.bodyModal}>
          <div className={classes.bodyModal_option}>
            <Avatar src="" alt="" />
            <select className="options">
              <option>Công khai</option>
              <option>Bạn bè</option>
              <option>Chỉ mình tôi</option>
            </select>
          </div>
          <div className={classes.bodyModal_form}>
            <form>
              <TextField
                placeholder="Haha, Hôm nay bạn thế nào?"
                multiline
                name="content"
                sx={{ width: '100%' }}
                label=""
                value={content}
                onChange={onChangeContent}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  style: {
                    fontSize: '18px'
                  },
                  classes: {
                    notchedOutline: classes.textField
                  }
                }}
                variant="outlined"
              />
            </form>
          </div>
          <div className={classes.bodyModal_footer}>
            <input
              accept="image/*"
              id="icon-button-file-form-post"
              type="file"
              name="imgUrl"
              ref={ref}
              style={{ display: 'none' }}
              onChange={onChange}
              multiple
            />
            <label htmlFor="icon-button-file-form-post">
              <IconButton color="primary" component="span" size="large">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <Card sx={{ display: `${images.length ? ' inherit' : 'none'}` }}>
            <IconButton onClick={handleRemoveImages}>
              <CloseIcon fontSize="large" />
            </IconButton>
            <FbImageLibrary
              images={images}
              countFrom={5}
              hideOverlay={true}
              onClickEach={({ src, index }) => {}}
            />
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!content && !images.length}
            onClick={onClick}
            variant="contained"
            fullWidth
            className={classes.btnCreatePost}
          >
            Chia sẻ
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ModalFormPost;

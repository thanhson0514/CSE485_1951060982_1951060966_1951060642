import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import authContext from '../../context/auth/authContext';
import commentContext from '../../context/comment/commentContext';
import CommentInputUpdate from './CommentInputUpdate';
import useStyles from './comments.style';

const ItemComment = ({
  username,
  avatar,
  content,
  id_user,
  id_cmt,
  id_post,
  imgUrl
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openInput, setOpenInput] = useState(false);
  const open = Boolean(anchorEl);

  const { user, loadUser, error } = useContext(authContext);
  const { deleteComment, loadComment, errorCmt, comment } =
    useContext(commentContext);

  useEffect(() => {
    if (openInput) loadUser();
    loadComment(id_post);

    if (error) setOpenInput(false);
    // eslint-disable-next-line
  }, [errorCmt, openInput, error, comment]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = () => {
    deleteComment(id_post, id_cmt);
  };

  const handleClickUpdate = () => {
    setAnchorEl(null);
    setOpenInput(true);
  };

  const handleClickCloseUpdate = () => {
    setOpenInput(false);
  };

  return (
    <div className={classes.commentContainer}>
      {openInput ? (
        <div className={classes.containerInputUpdate}>
          <CommentInputUpdate
            avatar={avatar}
            id_post={id_post}
            id_cmt={id_cmt}
            imgUrl={imgUrl}
            content={content}
            setOpenInput={setOpenInput}
          />
          <span>
            Nhấn<button onClick={handleClickCloseUpdate}>Huỷ</button>
          </span>
        </div>
      ) : (
        <>
          <div className={classes.commentContent}>
            <Avatar
              src={`${process.env.REACT_APP_BASE_URL_IMG}${avatar}`}
              className="avatar"
            />
            <Box
              sx={{
                backgroundColor: '#eee',
                padding: '5px 15px',
                borderRadius: '10px'
              }}
            >
              <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                {username}
              </Typography>
              <Typography sx={{ fontSize: '15px' }}>{content}</Typography>
            </Box>

            {!!(id_user === user?.id_user) && (
              <div>
                <IconButton
                  aria-label="settings"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'long-button'
                  }}
                >
                  <MenuItem onClick={handleClickUpdate}>Chỉnh sửa</MenuItem>
                  <MenuItem onClick={handleClickDelete}>Xóa</MenuItem>
                </Menu>
              </div>
            )}
          </div>
          <div className={classes.commentImage}>
            {!!imgUrl && (
              <img
                src={`${process.env.REACT_APP_BASE_URL_IMG}${imgUrl}`}
                alt=""
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemComment;

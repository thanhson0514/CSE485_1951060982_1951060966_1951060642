import React, { useState, useContext, useEffect, Fragment } from 'react';
import CommentState from '../../context/comment/CommentState';
import ReactionState from '../../context/reaction/ReactionState';
import FbImageLibrary from 'react-fb-image-grid';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Grid,
  CardActions,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import ReactTimeago from 'react-timeago';

import authContext from '../../context/auth/authContext';
import postContext from '../../context/post/postContext';
import ShowDetailImage from './ShowDetailImage';
import Reaction from '../reaction/Reaction';
import FormComment from '../form-comment/FormComment';
import Comment from '../comments/Comments';
import ModalFormPost from '../form-post/ModalFormPost';
import useStyles from './post.style';

const ItemPost = ({
  imgUrl,
  content,
  avatar,
  username,
  created_at,
  id_post,
  id_user
}) => {
  const [show, setShow] = useState(false);
  const [imgIndex, setImgIndex] = useState(-1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModalFormPost, setOpenModalFormPost] = useState(false);

  const classes = useStyles();
  const open = Boolean(anchorEl);

  const { msg, deletePost, loadPost } = useContext(postContext);
  const { user, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line
  }, [msg]);

  const convertLinkImg = imgUrl.map((name) =>
    name ? `${process.env.REACT_APP_BASE_URL_IMG}${name}` : ''
  );

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickDeletePost = () => {
    setAnchorEl(null);
    deletePost(id_post);
  };

  const clickUpdatePost = () => {
    setAnchorEl(null);
    setOpenModalFormPost(true);
  };

  return (
    <CommentState>
      {!!openModalFormPost && (
        <ModalFormPost
          id_post={id_post}
          contentPost={content}
          imgUrl={imgUrl}
          setOpen={setOpenModalFormPost}
          open={openModalFormPost}
          isEditPost={true}
        />
      )}
      <Card
        sx={{ marginTop: '5px', boxShadow: '1px 3px 5px 1px rgba(0,0,0, .2)' }}
      >
        {show && (
          <ShowDetailImage
            imgIndex={imgIndex}
            convertLinkImg={convertLinkImg}
            show={show}
            setShow={setShow}
            avatar={avatar}
            username={username}
          />
        )}
        <CardHeader
          avatar={
            <Avatar src={`${process.env.REACT_APP_BASE_URL_IMG}${avatar}`} />
          }
          action={
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
                {!!(id_user === user?.id_user) && (
                  <Fragment>
                    <MenuItem onClick={clickDeletePost}>Xóa bài viết</MenuItem>
                    <MenuItem onClick={clickUpdatePost}>
                      Chỉnh sửa bài viết
                    </MenuItem>
                  </Fragment>
                )}
                <MenuItem>Báo cáo</MenuItem>
              </Menu>
            </div>
          }
          title={username}
          subheader={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ReactTimeago date={created_at} />
              <span>&nbsp;·&nbsp;</span>
              <IconButton disabled={true}>
                <PublicOutlinedIcon />
              </IconButton>
            </div>
          }
          aria-label="recipe"
          titleTypographyProps={{ variant: 'default' }}
        />

        <Grid container>
          <Grid item xs={12}>
            <p style={{ padding: '0 15px' }}>{content}</p>
          </Grid>

          {imgUrl[0] && (
            <FbImageLibrary
              images={convertLinkImg}
              countFrom={5}
              hideOverlay={true}
              onClickEach={({ src, index }) => {
                setShow(true);
                setImgIndex(index);
              }}
            />
          )}
          {/* Phần thả reaction */}
          <ReactionState>
            <Reaction key={id_post} id_post={id_post} />
          </ReactionState>
        </Grid>

        {/* Phần hiện thị các bình luận bình luận  */}
        <Comment id_post={id_post} className={classes.commentContainer} />

        <CardActions>
          {isAuthenticated && (
            <FormComment key={id_post} id_post={id_post} avatar={avatar} />
          )}
        </CardActions>
      </Card>
    </CommentState>
  );
};

export default ItemPost;

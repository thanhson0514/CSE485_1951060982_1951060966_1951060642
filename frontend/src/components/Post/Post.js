import React, { useEffect, useContext } from 'react';
import { Container } from '@mui/material';

import FormPost from '../form-post/FormPost';
import Spinner from '../layout/Spinner/Spinner';
import ItemPost from './ItemPost';
import authContext from '../../context/auth/authContext';
import postContext from '../../context/post/postContext';
import useStyles from './post.style';

const Post = () => {
  const { isAuthenticated, loadUser } = useContext(authContext);
  const { getAllPost, posts, error } = useContext(postContext);
  const classes = useStyles();

  useEffect(() => {
    loadUser();
    getAllPost();
    if (error) loadUser();
    // eslint-disable-next-line
  }, [error]);

  return (
    <Container
      sx={{ backgroundColor: 'rgba(0,0,0,0)' }}
      className={classes.post}
    >
      {!!isAuthenticated && <FormPost />}
      {posts?.length ? (
        posts?.map((post, index) => <ItemPost key={index} {...post} />)
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Post;

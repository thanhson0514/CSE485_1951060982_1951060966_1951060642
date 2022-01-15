import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ReplyIcon from '@mui/icons-material/Reply';

import reactionContext from '../../context/reaction/reactionContext';
import authContext from '../../context/auth/authContext';

const Reaction = ({ id_post }) => {
  const [isLike, setIsLike] = useState(false);

  const {
    getReactions,
    reactions,
    countReact,
    reaction,
    createReaction,
    deleteReaction
  } = useContext(reactionContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    getReactions(id_post);
    if (user) setIsLike(reactions?.includes(user['id_user']));
    // eslint-disable-next-line
  }, [reaction, reactions?.length]);

  const onClick = async () => {
    setIsLike(true);
    createReaction(id_post);
  };

  const removeRec = () => {
    setIsLike(false);
    deleteReaction(id_post);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!!countReact && (
          <Typography sx={{ marginLeft: '15px' }}>
            <ThumbUpOutlinedIcon
              fontSize="medium"
              sx={{
                marginRight: '5px',
                border: '1px solid rgba(0,102,220, .5)',
                padding: '2px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,90,225, .6)',
                color: '#fff'
              }}
            />
            <span>{countReact}</span>
          </Typography>
        )}
      </Grid>
      {!!user && (
        <Fragment>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{
                width: '100%',
                color: `${isLike ? '#199cd3' : '#aaa'}`
              }}
              onClick={!isLike ? onClick : removeRec}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <ThumbUpOutlinedIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography sx={{ color: '#000' }}>Haha</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ width: '100%', color: '#aaa' }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <ForumOutlinedIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography sx={{ color: '#000' }}>Bình luận</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ width: '100%', color: '#aaa' }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <ReplyIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography sx={{ color: '#000' }}>Chia sẻ</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default Reaction;

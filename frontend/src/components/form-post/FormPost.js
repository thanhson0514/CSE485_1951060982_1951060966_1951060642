import React, { useState } from 'react';
import { Grid, Card, Avatar } from '@mui/material';

import ModalFormPost from './ModalFormPost';
import styles from './formPost.style';

const FormPost = () => {
  const classes = styles();
  const [isActive, setIsActive] = useState(true);
  const [open, setOpen] = useState(false);

  const onClick = (e) => setIsActive(!!parseInt(e.target.name));

  const openModalForm = () => setOpen(true);

  return (
    <Card>
      <Grid container className={classes.container}>
        <button
          onClick={onClick}
          className={isActive ? classes.tabActive : classes.tabNoActive}
          name="1"
        >
          Tạo bài biết
        </button>
        <button
          variant={`${!isActive ? 'contained' : ''}`}
          onClick={onClick}
          className={!isActive ? classes.tabActive : classes.tabNoActive}
          name="0"
        >
          Chia sẻ trải nghiệm
        </button>
      </Grid>
      <div className={classes.formContainer} onClick={openModalForm}>
        <Avatar src="" alt="" />
        <form className={classes.formNewFeed}>
          <input disabled placeholder="Haha, Hôm nay bạn thế nào?" />
        </form>
      </div>
      <hr />
      <Grid container></Grid>
      <ModalFormPost open={open} setOpen={setOpen} />
    </Card>
  );
};

export default FormPost;

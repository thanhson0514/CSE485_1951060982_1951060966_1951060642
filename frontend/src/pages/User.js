import React from 'react';
import { Card, Avatar, IconButton } from '@mui/material';

import useStyles from './styles/user.styles';
import backgroundDefault from '../assets/img/default-background-user.jfif';

const User = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Card className={classes.head}>
        <img src={backgroundDefault} alt="ảnh bìa" className="backgroundUser" />
        <div className="containerAvatar">
          <IconButton>
            <Avatar src="" className="avatar" />
          </IconButton>
          <h3>Họ tên</h3>
        </div>
      </Card>
      <div>
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default User;

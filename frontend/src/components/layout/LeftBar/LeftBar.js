import React, { useContext, Fragment } from 'react';
import { Card, CardHeader, Avatar } from '@mui/material';

import authContext from '../../../context/auth/authContext';

import './LeftBar.css';

const LeftBar = () => {
  const { user } = useContext(authContext);

  return (
    <Fragment>
      {!!user && (
        <Card sx={{marginTop: '15px'}}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={user.avatar} />}
            title={user.username}
            subheader="Xem hồ sơ"
            titleTypographyProps={{
              style: {
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }
            }}
            subheaderTypographyProps={{
              style: {
                fontSize: '13px',
                cursor: 'pointer'
              }
            }}
          />
        </Card>
      )}
    </Fragment>
  );
};

export default LeftBar;

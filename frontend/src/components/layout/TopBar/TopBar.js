import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Grid,
  IconButton
} from '@mui/material';

import Logo from '../../../assets/svg/Logo';
import News from '../../../assets/svg/News';
import Explore from '../../../assets/svg/Explore';
import Tour from '../../../assets/svg/Tour';
import Hotel from '../../../assets/svg/Hotel';
import Plane from '../../../assets/svg/Plane';
import Car from '../../../assets/svg/Car';
import Shopping from '../../../assets/svg/Shopping';

import UserFunction from './UserFunction';

import './TopBar.css';
const pages = [
  { 'Bảng tin': <News /> },
  { 'Trải nghiệm': <Explore /> },
  { Tour: <Tour /> },
  { 'Khách sạn': <Hotel /> },
  { 'Vé máy bay': <Plane /> },
  { 'Thuê xe': <Car /> },
  { 'Mua sắm': <Shopping /> }
];
const links = [
  '/',
  '/experience',
  '/tour',
  '/hotel',
  '/flight',
  '/car',
  '/shopping'
];

const TopBar = () => {
  return (
    <AppBar sx={{ backgroundColor: '#fff' }}>
      <Toolbar disableGutters>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <IconButton>
              <Logo />
            </IconButton>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {pages.map((page, index) => (
                <Button
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: `${
                      window.location.pathname === links[index]
                        ? '2px solid #228af2'
                        : 0
                    }`,
                    borderRadius: 0,
                    outline: 'none'
                  }}
                  href={links[index]}
                >
                  {page[Object.keys(page)[0]]}
                  <Typography>{String(Object.keys(page)[0])}</Typography>
                </Button>
              ))}
            </Grid>
          </Grid>
          <Grid item sx={{ marginRight: '10px' }}>
            <UserFunction />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

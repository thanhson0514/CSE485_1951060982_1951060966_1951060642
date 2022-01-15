import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { useScrollTrigger, Grid, Toolbar } from '@mui/material';

import TopBar from '../components/layout/TopBar/TopBar';
import Post from '../components/Post/Post';
import LeftBar from '../components/layout/LeftBar/LeftBar';
import RightBar from '../components/layout/RightBar/RightBar';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const Home = (props) => {
  return (
    <Fragment>
      <ElevationScroll {...props}>
        <TopBar />
      </ElevationScroll>
      <Toolbar />
      <Grid container>
        <Grid item xs={3}>
          <LeftBar />
        </Grid>
        <Grid item xs={6} sx={{ marginTop: '10px' }}>
          <Post />
        </Grid>
        <Grid item xs={3}>
          <RightBar />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;

import React, { Fragment } from 'react';
import TopBar from '../components/layout/TopBar/TopBar';

const Page404 = () => {
  return (
    <Fragment>
      <TopBar />
      <div style={{ height: '100px' }}></div>
      <h1 style={{ marginTop: '20px', textAlign: 'center' }}>
        Page Not Found!
      </h1>
    </Fragment>
  );
};

export default Page404;

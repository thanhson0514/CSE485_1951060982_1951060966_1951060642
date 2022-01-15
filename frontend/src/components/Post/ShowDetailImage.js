import React, { useState } from 'react';
import { Grid, IconButton, Modal, Paper, Avatar } from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ShowDetailImage = ({
  imgIndex,
  convertLinkImg,
  show,
  setShow,
  avatar,
  username
}) => {
  const [index, setIndex] = useState(imgIndex);
  const onClick = () => setShow(false);

  const nextImage = () => {
    if (index === 0) setIndex(index + 1);
    else setIndex((index + 1) % convertLinkImg.length);
  };

  const backImage = () => {
    if (index === 0) setIndex(convertLinkImg.length - 1);
    else if (index === 1) setIndex(0);
    else setIndex((index - 1) % convertLinkImg.length);
  };

  return (
    <Modal open={show}>
      <Paper sx={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
        <Grid container justifyContent="center" sx={{ height: '100%' }}>
          <Grid item xs={9} style={{ height: '100%', width: '100%' }}>
            <div
              style={{
                backgroundImage: `url("${convertLinkImg[index]}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
                backgroundColor: '#000',
                height: '100%',
                width: '100%',
                position: 'relative'
              }}
            >
              <IconButton onClick={onClick}>
                <CancelOutlinedIcon sx={{ fontSize: '40px', color: '#fff' }} />
              </IconButton>
              {convertLinkImg.length > 1 && (
                <>
                  <IconButton
                    onClick={nextImage}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translate(0, 50%)',
                      right: 0,
                      backroundColor: 'rgba(255,255,255, .5)',
                      color: '#fff'
                    }}
                  >
                    <ArrowForwardIosIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    onClick={backImage}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translate(0, 50%)',
                      left: 0,
                      backroundColor: 'rgba(255,255,255, .5)',
                      color: '#fff'
                    }}
                  >
                    <ArrowBackIosNewIcon fontSize="large" color="#fff" />
                  </IconButton>
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={3}>
            <div
              style={{
                borderBottom: '1px solid rgba(0,0,0,.2)',
                display: 'flex',
                gap: '15px',
                padding: '10px 0 20px 5px',
                alignItems: 'center'
              }}
            >
              <Avatar src={avatar} />
              <p style={{ fontWeight: 'bold' }}>{username}</p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ShowDetailImage;

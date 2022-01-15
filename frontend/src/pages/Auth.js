import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';

import FormLogin from '../components/form-login/FormLogin';
import FormRegister from '../components/form-register/FormRegister';
import HahaloloLogo from '../assets/svg/HahaloloLogo';
import useStyle from './styles/auth.styles';

const Auth = () => {
  const styles = useStyle();
  const location = useLocation();
  let height = '105vh';

  if (location.pathname === '/register') height = '135vh';

  return (
    <Paper>
      <Grid container className={styles.container} sx={{ height: height }}>
        <Grid item xs={12} md={7} className={styles.gridColLeft}>
          <div className="gridColLeft_title">
            <HahaloloLogo className="logo" />
            <span>Hahalolo</span>
          </div>
          <div className="gridColLeft_subtitle">
            <Typography variant="h3" component="div" fontWeight={450}>
              Bạn thích
            </Typography>
            <Typography variant="h1" component="div" fontWeight={600}>
              đi du lịch?
            </Typography>
            <Typography variant="h3" component="div" fontWeight={500}>
              Bạn muốn tìm hiểu thông tin về những điểm đến?
            </Typography>
            <Typography variant="body1" fontSize={24} component="div">
              Chỉ với vài thao tác, hãy nhanh chóng đăng nhập để trải nghiệm và
              cảm nhận các tiện ích tuyệt vời của chúng tôi.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={5} zIndex={9}>
          <div className={styles.gridColRight}>
            {!!(location.pathname === '/login') && (
              <FormLogin className={styles.form} />
            )}
            {!!(location.pathname === '/register') && (
              <FormRegister className={styles.form} />
            )}
          </div>
        </Grid>
        <div className="footer">Bài tập lớn môn Công nghệ Web - Nhóm 1</div>
      </Grid>
    </Paper>
  );
};

export default Auth;

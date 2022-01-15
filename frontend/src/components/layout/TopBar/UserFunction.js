import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import authContext from '../../../context/auth/authContext';

const UserFunction = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuthenticated, logout, loadUser, user, clearError } =
    useContext(authContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClick = () => {
    if (!isAuthenticated) {
      clearError();
      navigate('/login');
    } else logout();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="" src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {!!user && (
          <MenuItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '15px'
            }}
          >
            <Avatar alt="" src="" />
            <Typography sx={{fontSize: '20px', margin: '5px'}}>{user.username}</Typography>
          </MenuItem>
        )}
        <MenuItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '15px'
          }}
        >
          <AccountBalanceWalletOutlinedIcon
            fontSize="large"
            sx={{ marginRight: '10px' }}
          />
          <Typography fontSize={18}>Quản lý đơn hàng</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '15px 20px',
            width: '100%'
          }}
        >
          <WbSunnyOutlinedIcon fontSize="large" sx={{ marginRight: '10px' }} />
          <div style={{ width: '100%' }}>
            <Typography component="div" fontSize={18}>
              Chế độ tối (Tắt)
            </Typography>
            <Typography
              fontWeight="light"
              fontSize={14}
              color="rgba(0,0,0,0.5)"
            >
              Điều chỉnh giao diện để giảm độ chói <br /> và cho đôi mắt được
              nghỉ.
            </Typography>
          </div>
        </MenuItem>
        <MenuItem
          onClick={onClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '15px 20px',
            fontSize: '18px'
          }}
        >
          <ExitToAppOutlinedIcon
            fontSize="large"
            sx={{
              marginRight: '10px',
              transform: `${isAuthenticated ? undefined : 'scaleX(-1)'}`
            }}
          />
          {isAuthenticated ? 'Đăng xuất' : 'Đăng nhập'}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserFunction;

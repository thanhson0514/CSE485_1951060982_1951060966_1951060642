import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Card,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  Alert,
  Link
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AuthContext from '../../context/auth/authContext';
import './FormLogin.css';

const FormLogin = () => {
  const navigate = useNavigate();
  const [filledInputErrorEmail, setFilledInputErrorEmail] = useState(false);
  const [filledInputErrorPass, setFilledInputErrorPass] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = React.useState(true);

  const { clearError, error, login, isAuthenticated } = useContext(AuthContext);
  const { email, password } = form;

  useEffect(() => {
    if (!error) clearError();
    if (isAuthenticated) {
      clearError();
      navigate('/');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFilledInputErrorEmail(!!email);
      setFilledInputErrorPass(!!password);
    } else {
      setFilledInputErrorEmail(false);
      setFilledInputErrorPass(false);

      login({
        email,
        password
      });
    }
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Card sx={{ width: '80%', padding: '5px 15px' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', margin: '20px 0' }}>
        Đăng nhập
      </Typography>

      <form style={{ padding: '5px', margin: '10px 5px' }} onSubmit={onSubmit}>
        <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
          <TextField
            error={filledInputErrorEmail}
            inputRef={(input) => {
              if (filledInputErrorEmail && input && !email) input.focus();
            }}
            label="Email hoặc số điện thoại"
            name="email"
            onChange={onChange}
            value={email}
            InputProps={{
              style: {
                fontSize: '15px'
              }
            }}
            InputLabelProps={{
              style: {
                fontSize: '15px'
              }
            }}
          />
        </FormControl>

        <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
          <TextField
            error={filledInputErrorPass}
            inputRef={(input) => {
              if (!filledInputErrorEmail && filledInputErrorPass && input)
                input.focus();
            }}
            name="password"
            type={!showPassword ? 'text' : 'password'}
            value={password}
            onChange={onChange}
            InputProps={{
              style: {
                fontSize: '15px'
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            InputLabelProps={{
              style: {
                fontSize: '15px'
              }
            }}
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
          {!!error && (
            <Alert sx={{ fontSize: '15px' }} severity="error">
              {error}
            </Alert>
          )}
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2, fontSize: '15px', borderRadius: '20px' }}
        >
          Đăng nhập
        </Button>
      </form>

      <Typography
        component="div"
        variant="p"
        sx={{
          textAlign: 'center',
          fontSize: '14px',
          margin: '5px 0 15px 0'
        }}
      >
        Bạn chưa có tài khoản? <Link href="/register">Đăng kí tại đây!</Link>
      </Typography>
    </Card>
  );
};

export default FormLogin;

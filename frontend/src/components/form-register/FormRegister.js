import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  Card,
  Typography,
  FormControl,
  Button,
  Link,
  Alert
} from '@mui/material';

import authContext from '../../context/auth/authContext';

const FormRegister = () => {
  const navigate = useNavigate();
  const [messageFieldText, setMessageFieldText] = useState({
    isComfirm: false,
    isLength: false,
    msg: '',
    isFirstName: false,
    isLastName: false,
    isEmail: false,
    isPass: false,
    isComfirmPass: false
  });

  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    comfirmPassword: ''
  });

  const { lastName, firstName, email, password, comfirmPassword } = form;
  const { register, error, isAuthenticated, clearError } =
    useContext(authContext);

  useEffect(() => {
    if (!error) clearError();
    if (isAuthenticated) {
      clearError();
      navigate('/');
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !comfirmPassword) {
      setMessageFieldText({
        ...messageFieldText,
        isFirstName: !firstName,
        isLastName: !lastName,
        isEmail: !email,
        isPass: !password,
        isComfirm: !comfirmPassword,
        msg: 'Bắt buộc phải điền'
      });
      return;
    }
    setMessageFieldText({
      ...messageFieldText,
      isFirstName: false,
      isLastName: false,
      isEmail: false,
      isPass: false,
      isComfirm: false,
      msg: ''
    });
    if (password.length < 6) {
      setMessageFieldText({
        ...messageFieldText,
        msg: 'Mật khẩu phải dài hơn 6 kí tự',
        isLength: true
      });
      return;
    }
    setMessageFieldText({
      ...messageFieldText,
      msg: '',
      isLength: false
    });

    if (comfirmPassword !== password) {
      setMessageFieldText({
        ...messageFieldText,
        msg: 'Mật khẩu xác nhận không khớp',
        isComfirm: true,
        isLength: false
      });
      return;
    }
    setMessageFieldText({
      ...messageFieldText,
      msg: '',
      isComfirm: false,
      isLength: false
    });
    register({
      firstName,
      lastName,
      email,
      password
    });
  };

  return (
    <Card sx={{ width: '80%', padding: '5px 15px' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', margin: '20px 0' }}>
        Đăng Ký
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
              <TextField
                label="Tên"
                error={messageFieldText.isFirstName}
                helperText={`${
                  messageFieldText.isFirstName ? messageFieldText.msg : ''
                }`}
                FormHelperTextProps={{
                  style: {
                    fontSize: '13px'
                  }
                }}
                name="firstName"
                value={firstName}
                onChange={onChange}
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
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
              <TextField
                error={messageFieldText.isLastName}
                helperText={`${
                  messageFieldText.isLastName ? messageFieldText.msg : ''
                }`}
                FormHelperTextProps={{
                  style: {
                    fontSize: '13px'
                  }
                }}
                label="Họ"
                name="lastName"
                value={lastName}
                onChange={onChange}
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
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
              <TextField
                type="email"
                error={messageFieldText.isEmail}
                helperText={`${
                  messageFieldText.isEmail ? messageFieldText.msg : ''
                }`}
                FormHelperTextProps={{
                  style: {
                    fontSize: '13px'
                  }
                }}
                label="Điện thoại hoặc email"
                name="email"
                value={email}
                onChange={onChange}
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
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
              <TextField
                type="password"
                error={messageFieldText.isLength || messageFieldText.isPass}
                helperText={`${
                  messageFieldText.isLength || messageFieldText.isPass
                    ? messageFieldText.msg
                    : ''
                }`}
                FormHelperTextProps={{
                  style: {
                    fontSize: '13px'
                  }
                }}
                label="Mật khẩu"
                name="password"
                value={password}
                onChange={onChange}
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
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
              <TextField
                type="password"
                error={
                  messageFieldText.isComfirm || messageFieldText.isComfirmPass
                }
                helperText={`${
                  (messageFieldText.isComfirm && !messageFieldText.isLength) ||
                  messageFieldText.isComfirmPass
                    ? messageFieldText.msg
                    : ''
                }`}
                FormHelperTextProps={{
                  style: {
                    fontSize: '13px'
                  }
                }}
                label="Xác nhận mật khẩu"
                name="comfirmPassword"
                value={comfirmPassword}
                onChange={onChange}
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
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ margin: '10px 0' }} fullWidth variant="outlined">
              {!!error && (
                <Alert sx={{ fontSize: '15px' }} severity="error">
                  {error}
                </Alert>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2, fontSize: '15px', borderRadius: '20px' }}
            >
              Đăng Ký
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="div"
              variant="p"
              sx={{
                textAlign: 'center',
                fontSize: '14px',
                margin: '5px 0 10px 0',
                width: '100%'
              }}
            >
              Bạn đã có tài khoản? <Link href="/login">Đăng nhập</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default FormRegister;

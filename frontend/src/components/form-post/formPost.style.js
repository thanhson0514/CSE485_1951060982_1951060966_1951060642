import { makeStyles } from '@mui/styles';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75'
};

export default makeStyles({
  container: {
    backgroundColor: `${blue[400]}`,
    padding: '5px 0 0 3px',
    '& button': {
      padding: '5px 10px'
    }
  },
  tabActive: {
    backgroundColor: '#fff',
    color: '#000',
    border: 0,
    outline: 'none',
    borderRadius: '5px 5px 0 0',

    '&:hover': {
      backgroundColor: '#ddd'
    }
  },
  tabNoActive: {
    backgroundColor: `${blue[400]}`,
    color: '#fff',
    outline: 'none',
    border: 0,

    '&:hover': {
      backgroundColor: `${blue[700]}`
    }
  },
  
  formContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px 10px',
    cursor: 'pointer'
  },

  formNewFeed: {
    marginLeft: '10px',
    width: '100%',

    '& input': {
      backgroundColor: '#fff',
      width: '80%',
      border: 0,
      outline: 'none',
      cursor: 'pointer !important'
    }
  }
});

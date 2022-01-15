import { makeStyles } from '@mui/styles';

export default makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%'
  },

  head: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '80%',

    '& .backgroundUser': {
      width: '100%',
      height: '75%',
      objectFit: 'fill'
    },

    '& .containerAvatar': {
      zIndex: '1000',
      position: 'absolute',
      top: '80%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },

    '& .containerAvatar .avatar': {
      width: '150px',
      height: '150px'
    },

    '& .containerAvatar h3': {
      fontWeight: 'bold',
      margin: 0,
      padding: 0
    }
  }
});

import { makeStyles } from '@mui/styles';

export default makeStyles({
  container: {
    padding: '110px 30px 0 30px',
    position: 'relative',

    '&::before': {
      content: '""',
      width: '1000px',
      height: '800px',
      borderRadius: '50%',
      backgroundImage:
        'linear-gradient(linear, left top, left bottom, from(0), color-stop(#c3f0f9), to(#87dbf0))',
      // eslint-disable-next-line no-dupe-keys
      backgroundImage: 'linear-gradient(0, #c3f0f9, #87dbf0)',
      position: 'fixed',
      top: '-15%',
      right: '-40%',
      transform: 'translate(-35%, -50%)',
      zIndex: 1
    },

    '&::after': {
      content: '""',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      backgroundColor: 'rgba(218, 245, 251, 0.8)',
      position: 'fixed',
      top: '-15%',
      left: '40%',
      '-webkit-transform': 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      zIndex: 1
    },

    '& .footer': {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 0)'
    }
  },
  gridColLeft: {
    zIndex: 9,

    '& svg': {
      width: '90px',
      height: '85px',
      fill: '#24a8d8',
      padding: 0,
      margin: 0
    },

    '& span': {
      fontSize: '32px',
      color: '#24a8d8',
      padding: 0,
      margin: 0
    },

    '& .gridColLeft_title': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%'
    },

    '& .gridColLeft_subtitle': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }
  },
  gridColRight: {
    zIndex: 9,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  }
  // form: {
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   backgroundColor: '#fff',
  //   zIndex: 10,
  // }
});

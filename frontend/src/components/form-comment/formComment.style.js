import { makeStyles } from '@mui/styles';

export default makeStyles({
  commentContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingRight: '15px',
    position: 'relative',

    '& .avatar': {
      marginRight: '10px'
    },

    '& .input': {
      width: '100%',
      padding: '10px 18px',
      border: '1px solid rgba(0,0,0,.2)',
      outline: 0,
      borderRadius: '20px'
    },

    '& .icon': {
      position: 'absolute',
      right: '25px',
      top: '55%',
      transform: 'translate(0, -50%)'
    }
  },

  formCommentImage: {
    display: 'flex',
    padding: '0 20px',
    alignItems: 'flex-start',

    '& img': {
      width: '25%',
      height: '100%'
    }
  },

  formCommentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px'
  }
});

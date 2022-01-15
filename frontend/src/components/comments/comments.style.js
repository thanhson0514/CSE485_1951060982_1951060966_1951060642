import { makeStyles } from '@mui/styles';

export default makeStyles({
  commentContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '15px 20px'
  },

  commentContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px',

    '& .avatar': {
      marginRight: '8px'
    }
  },

  commentImage: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '55%',

    '& img': {
      //   width: '55%',
      objectFit: 'cover',
      height: '120px',
      marginLeft: '20px',
      borderRadius: '15px'
    }
  },

  commentInputContainer: {
    display: 'flex',
    position: 'relative',

    '& .avatar': {
      marginRight: '10px'
    },

    '& .input': {
      width: '100%',
      padding: '10px 18px',
      border: '1px solid rgba(0,0,0,.2)',
      outline: 0,
      borderRadius: '20px',
      marginRight: '10px'
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
      height: '100%',
      margin: '10px'
    }
  },

  formCommentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '15px'
  },

  containerInputUpdate: {
    '& span button': {
      border: 0,
      outline: 0,
      color: '#05a',
      backgroundColor: 'transparent'
    },

    '& span button:hover': {
      textDecoration: 'underline'
    }
  }
});

import { makeStyles } from '@mui/styles';

export default makeStyles({
  post: {
    height: '85vh',
    overflow: 'scroll',
    overflowX: 'hidden',

    '&::-webkit-scrollbar': {
      width: 0,
      backgroundColor: 'transparent'
    }
  },
});

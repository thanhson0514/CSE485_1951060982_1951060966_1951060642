import { makeStyles } from '@mui/styles';

export default makeStyles({
  bodyModal: {
    width: '500px'
  },
  bodyModal_option: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,

    '& .options': {
      marginLeft: '8px',
      height: '30px'
    }
  },
  bodyModal_form: {
    width: '100%',
    margin: '10px 0',

    '& form': {
      width: '100%'
    }
  },
  
  textField: {
      border: 0,
      outline: 'none'
  },

  btnCreatePost: {
      backgroundColor: '#3399FF',
      borderRadius: '15px'
  }
});

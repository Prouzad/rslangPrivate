import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SignUp from '../components/Authorization/SignUp/index'
import LogIn from '../components/Authorization/LogIn/index'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: 'min(300px, 60vw)',

  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,

};

const LoginPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Временная кнопка LogIn</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <LogIn/>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginPage;
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LogIn from './LogIn/index'
import { authStyle } from './AuthStyle';


const LoginPage = () => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <div>
      <Button sx={{ color: 'black' }} onClick={handleOpenLogin}>Временная кнопка LogIn</Button>
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={authStyle}>
          <LogIn handleOpenLogin={handleOpenLogin} handleCloseLogin={handleCloseLogin} openLogin={openLogin} />
        </Box>
      </Modal>
    </div>
  );
}

export default LoginPage;
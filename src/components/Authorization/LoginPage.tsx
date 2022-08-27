import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LogIn from './LogIn/index';
import { authStyle } from './AuthStyle';

const LoginPage = () => {
	return (
		<Modal
			open={true}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={authStyle}>
				<LogIn />
			</Box>
		</Modal>
	);
};

export default LoginPage;

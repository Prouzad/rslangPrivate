import * as React from 'react';
import Modal from '@mui/material/Modal';
import LoginTabPanel from './LoginTabPanel';

interface IProps {
	show: boolean;
	handleClose: (x: boolean) => void;
}

const LoginPage = (props: IProps) => {
	return (
		<Modal
			open={props.show}
			onClose={() => props.handleClose(false)}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<LoginTabPanel/>
		</Modal>
	);
};

export default LoginPage;

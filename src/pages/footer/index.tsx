import { Link } from 'react-router-dom';
import AvatarImg from '../../assets/icon/avatar.png';
import RsLogo from '../../assets/icon/rs_school_js.svg';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footerContainer'>
				<div className='logoRs'>
					<Link to='https://rs.school/js/'>
						<img src={RsLogo} alt='' />
					</Link>
				</div>
				<div className='githubLinks'>
					<Link to='/'>
						<img src={AvatarImg} alt='github' />
					</Link>
					<Link to='/'>
						<img src={AvatarImg} alt='github' />
					</Link>
					<Link to='/'>
						<img src={AvatarImg} alt='github' />
					</Link>
				</div>
				<div className='yearApp'>2022</div>
			</div>
		</footer>
	);
};

export default Footer;

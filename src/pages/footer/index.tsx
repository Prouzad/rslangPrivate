import { Link } from 'react-router-dom';
import AvatarImg from '../../assets/icon/avatar.png';
import RsLogo from '../../assets/icon/rs_school_js.svg';
import s from './Footer.module.css'

const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.footerContainer}>
				<div className={s.logoRs}>
					<Link to='https://rs.school/js/'>
						<img src={RsLogo} alt='' />
					</Link>
				</div>
				<div className={s.githubLinks}>
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
				<div className={s.yearApp}>2022</div>
			</div>
		</footer>
	);
};

export default Footer;

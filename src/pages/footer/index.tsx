import { Link } from 'react-router-dom';
import AvatarImg from '../../assets/icon/avatar.png';
import RsLogo from '../../assets/icon/rs_school_js.svg';
import s from './Footer.module.css'
import Prouzad from "../../assets/img/prouzad.png";
import aiscode from "../../assets/img/aiscode.png";
import botino from "../../assets/img/botino-k.png";

const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.footerContainer}>
				<div className={s.logoRs}>
					<a href='https://rs.school/js/'>
						<img src={RsLogo} alt='' />
					</a>
				</div>
				<div className={s.githubLinks}>
					<a href='https://github.com/Prouzad'>
						<img src={Prouzad} alt='github' />
					</a>
					<a href='https://github.com/aiscodes'>
						<img src={aiscode} alt='github' />
					</a>
					<a href='https://github.com/botino-k'>
						<img src={botino} alt='github' />
					</a>
				</div>
				<div className={s.yearApp}>2022</div>
			</div>
		</footer>
	);
};

export default Footer;

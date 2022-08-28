import './MainPage.model.css';
import mainImage from '../../assets/img/mainImage.png';
import TextBookImg from '../../assets/icon/textbook.png';
import DictionaryImg from '../../assets/icon/dictionary.png';
import GameImg from '../../assets/icon/game.jpg';
import StatisticsImg from '../../assets/icon/statistics.png';
import AvatarImg from '../../assets/icon/avatar.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Footer from '../footer/index';

const advantagesArr = [
	{
		title: 'Textbook',
		descripction:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!',
		img: TextBookImg,
	},
	{
		title: 'Dictionary',
		descripction:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!',
		img: DictionaryImg,
	},
	{
		title: 'Mini games',
		descripction:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!',
		img: GameImg,
	},
	{
		title: 'Statistics',
		descripction:
			'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!',
		img: StatisticsImg,
	},
];

const teamInfo = [
	{
		name: 'Abdulla Ergashev',
		descripction:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!',
		title: 'Frontend developer',
		link: '/',
		image: AvatarImg,
	},
	{
		name: 'Aigerim Temirova',
		descripction:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!',
		title: 'Frontend developer',
		link: '/',
		image: AvatarImg,
	},
	{
		name: 'Maria Gavrilova',
		descripction:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!',
		title: 'Frontend developer',
		link: '/',
		image: AvatarImg,
	},
];

const MainPage = () => {
	return (
		<div>
			<h3 style={{ fontSize: '32px', fontWeight: 400, marginLeft: '145px' }}>
				Main
			</h3>
			<div className='mainContainer'>
				<div className='mainBox'>
					<div className='mainDescription'>
						<h1>RS Lang</h1>
						<div className='mainText'>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus
							iste sequi amet vitae cumque. Voluptatibus optio fuga ratione
							dicta est iure. Quisquam sit culpa commodi quas accusantium eius
							voluptates aperiam? Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Animi, neque non excepturi tempora eos illum
							facere velit reprehenderit a labore! Eum tempora nobis voluptate
							expedita fugiat sint iusto voluptatibus vitae!
						</div>
						<Link to='/' style={{ textDecoration: 'none' }}>
							<Button variant='outlined'>Start</Button>
						</Link>
					</div>
					<div className='mainImg'>
						<img src={mainImage} alt='Main' />
					</div>
				</div>
				<div className='titleAdvantages'>
					<h2>Advantages</h2>
				</div>
				<div className='advantagesBox'>
					{advantagesArr.map((item) => (
						<Link
							to={'/' + item.title.toLowerCase()}
							className='advantagesLink'
						>
							<div className='advantages'>
								<div className='advantageLogo'>
									<img src={item.img} alt='textbook' />
								</div>
								<div className='advantageTitle'>
									<h2>{item.title}</h2>
								</div>
								<div className='advantageDesc'>{item.descripction}</div>
							</div>
						</Link>
					))}
				</div>
				<div className='teamBox'>
					<h2>Our Team</h2>
					{teamInfo.map((item) => (
						<Link to={item.link} className='advantagesLink'>
							<div className='CardBox'>
								<div className='avatar'>
									<img src={item.image} alt='Avatar' />
								</div>
								<div className='about'>
									<div className='name'>{item.name}</div>
									<div className='titlePerson'>{item.title}</div>
									<div className='descPerson'>{item.descripction}</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MainPage;

import './MainPage.model.css'
import mainImage from '../../assets/img/mainImage.png'
import TextBookImg from '../../assets/icon/textbook.png';
import DictionaryImg from '../../assets/icon/dictionary.png';
import GameImg from '../../assets/icon/game.jpg';
import StatisticsImg from '../../assets/icon/statistics.png';
import AvatarImg from '../../assets/icon/avatar.png';
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';




const MainPage = () => {
	return (
		<div>
			<h3 style={{fontSize: "32px", fontWeight: 400, marginLeft: "145px"}}>Main</h3>
			<div className="mainContainer">
				<div className="mainBox">
				<div className="mainDescription">
					<h1>RS Lang</h1>
					<div className="mainText">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus iste sequi amet vitae cumque. Voluptatibus optio fuga ratione dicta est iure. Quisquam sit culpa commodi quas accusantium eius voluptates aperiam?
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, neque non excepturi tempora eos illum facere velit reprehenderit a labore! Eum tempora nobis voluptate expedita fugiat sint iusto voluptatibus vitae!
					</div>
					<Link to='/' style={{textDecoration: 'none'}}>
						<Button variant="outlined">Start</Button>
					</Link>
				</div>
				<div className="mainImg">
					<img src={mainImage} />
				</div>	
				</div>
				<div className="titleAdvantages">
					<h2>Advantages</h2>
				</div>
				<div className='advantagesBox'>
					<Link to='/textbook' className='advantagesLink'>
						<div className='advantages'>
							<div className="advantageLogo">
								<img src={TextBookImg} alt="textbook"/>
							</div>
							<div className="advantageTitle">
								<h2>Textbook</h2>
							</div>
							<div className="advantageDesc">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!
							</div>
						</div>
					</Link>
					<Link to='/'  className='advantagesLink'>
						<div className='advantages'>
							<div className="advantageLogo">
								<img src={DictionaryImg} alt="Dictionary"/>
							</div>
							<div className="advantageTitle">
								<h2>Dictionary</h2>
							</div>
							<div className="advantageDesc">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!
							</div>
						</div>
					</Link>
					<Link to='/minigames'  className='advantagesLink'>
						<div className='advantages'>
							<div className="advantageLogo">
								<img src={GameImg} alt="games"/>
							</div>
							<div className="advantageTitle">
								<h2>Mini Games</h2>
							</div>
							<div className="advantageDesc">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!
							</div>
						</div>
					</Link>
					<Link to='statistics'  className='advantagesLink'> 
						<div className='advantages'>
							<div className="advantageLogo">
								<img src={StatisticsImg} alt="Statistics"/>
							</div>
							<div className="advantageTitle">
								<h2>Statistics</h2>
							</div>
							<div className="advantageDesc">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam fuga sapiente culpa! Aliquid eveniet soluta vitae, consectetur nesciunt, excepturi placeat, aut corrupti molestiae reiciendis harum praesentium? Sit perferendis debitis animi!
							</div>
						</div>
					</Link>
			</div>
			<div className="videoBox">
				<h2>All posibilities</h2>
				<ReactPlayer 
					className='react-player'
					url='https://www.youtube.com/watch?v=waAlgFq9Xq8' 
					width='100%'
					 />
			</div>
			<div className="teamBox">
				<h2>Our Team</h2>
				<Link to='/' className='advantagesLink'>
					<div className="CardBox">
						<div className="avatar">
							<img src={AvatarImg} alt="Avatar" />
						</div>
						<div className="about">
							<div className="name">Prouzad</div>
							<div className="titlePerson">Frontend developer</div>
							<div className="descPerson">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!</div>
						</div>
					</div>
				</Link>
				<Link to='/' className='advantagesLink'>
					<div className="CardBox">
						<div className="avatar">
							<img src={AvatarImg} alt="Avatar" />
						</div>
						<div className="about">
							<div className="name">Prouzad</div>
							<div className="titlePerson">Frontend developer</div>
							<div className="descPerson">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!</div>
						</div>
					</div>
				</Link>
				<Link to='/' className='advantagesLink'>
					<div className="CardBox">
						<div className="avatar">
							<img src={AvatarImg} alt="Avatar" />
						</div>
						<div className="about">
							<div className="name">Prouzad</div>
							<div className="titlePerson">Frontend developer</div>
							<div className="descPerson">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!</div>
						</div>
					</div>
				</Link>
			</div>
			</div>

		</div>
	)
};

export default MainPage;

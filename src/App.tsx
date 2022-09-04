import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getLocalStorage } from './api';
import Navbar from './components/Navbar';
import { IUserInfo } from './interfaces';
import Dictionary from './pages/Dictionary';
import Games from './pages/Games';
import AudioCall from './pages/Games/AudioCall';
import Sprint from './pages/Games/Sprint';
import MainPage from './pages/Main/MainPage';
import Statistics from './pages/Statistics';
import Textbook from './pages/Textbook';

const App = () => {
	const [userData, setUserData] = useState<IUserInfo | undefined>()

	async function fetchToken() {
		const user = await getLocalStorage();
		setUserData(user);
	}

	useEffect(() => {
		fetchToken()
	}, [])

	console.log('USER', userData);


	return (
		<>
			<Navbar userData={userData} setUserData={setUserData}/>
			<Routes>
				<Route path='/' element={<MainPage userData={userData} />} />
				<Route path='/main' element={<MainPage userData={userData} />} />
				<Route path='/textbook' element={<Textbook userData={userData} />} />
				<Route path='/games' element={<Games />} />
				<Route path='/statistics' element={<Statistics />} />
				<Route path="/dictionary" element={<Dictionary userData={userData} />} />
				<Route path="/sprint" element={<Sprint userData={userData} />} />
				<Route path="/audio-call" element={<AudioCall userData={userData} />} />
			</Routes>
		</>
	);
};

export default App;

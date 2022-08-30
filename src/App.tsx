import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getLocalStorage } from './api';
import Navbar from './components/Navbar';
import { IUserInfo } from './interfaces';
import Dictionary from './pages/Dictionary';
import Games from './pages/Games';
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

	return (
		<>
			<Navbar userData={userData} />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/main' element={<MainPage />} />
				<Route path='/textbook' element={<Textbook userData={userData} />} />
				<Route path='/game' element={<Games />} />
				<Route path='/statistics' element={<Statistics />} />
				<Route path="/dictionary" element={<Dictionary userData={userData} />} />
			</Routes>
		</>
	);
};

export default App;

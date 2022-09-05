import { createContext, useEffect, useState } from 'react';
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

export const ContextLogin = createContext<any>(null);

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
			<ContextLogin.Provider value={[userData, setUserData]}>
					<Navbar  />
			</ContextLogin.Provider>
			<Routes>
				<Route path='/rslangPrivate/' element={<MainPage userData={userData} />} />
				<Route path='/rslangPrivate/main' element={<MainPage userData={userData} />} />
				<Route path='/rslangPrivate/textbook' element={<Textbook userData={userData} />} />
				<Route path='/rslangPrivate/games' element={<Games />} />
				<Route path='/rslangPrivate/statistics' element={<Statistics />} />
				<Route path="/rslangPrivate/dictionary" element={<Dictionary userData={userData} />} />
				<Route path="/rslangPrivate/sprint" element={<Sprint userData={userData} />} />
				<Route path="/rslangPrivate/audio-call" element={<AudioCall userData={userData} />} />
			</Routes>
		</>
	);
};

export default App;

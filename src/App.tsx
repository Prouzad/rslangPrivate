import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/Main/MainPage';
import MiniGamesPage from './pages/MiniGamesPage';
import StatisticsPage from './pages/StatisticsPage';
import TextBookPage from './pages/TextBookPage';

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/main' element={<MainPage />} />
				<Route path='/textbook' element={<TextBookPage />} />
				<Route path='/minigame' element={<MiniGamesPage />} />
				<Route path='/statistics' element={<StatisticsPage />} />
			</Routes>
		</>
	);
};

export default App;

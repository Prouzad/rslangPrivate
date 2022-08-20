import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MiniGamesPage from './pages/MiniGamesPage';
import StatisticsPage from './pages/StatisticsPage';
import TextBookPage from './pages/TextBookPage';

const App = () => {
	return (		
		<Routes>
			<Route path='/main' element={<MainPage />} />
			<Route path='/textbook' element={<TextBookPage />} />
			<Route path='/minigame' element={<MiniGamesPage />} />
			<Route path='/statistics' element={<StatisticsPage />} />

		</Routes>
	)
};

export default App;

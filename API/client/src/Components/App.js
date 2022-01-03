import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import Portfolio from './Portfolio';
import history from '../History';

const App = () => {
	return (
		<div>
			<Routes history={history}>
				<Route path="/" element={<Navbar />}>
					<Route index element={<Landing />} />
					<Route path="/portfolio" element={<Portfolio />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;

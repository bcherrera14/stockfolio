import React from 'react';
import { Routes, Route, NavLink, useNavigate, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Landing from './Landing';
import Portfolio from './Portfolio';
import PrivateRoute from './PrivateRoute';

const App = () => {
	let navigate = useNavigate();

	return (
		<div>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route index element={<Landing navigate={navigate} />} />
					<Route path="/portfolio" element={<Portfolio navigate={navigate} />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;

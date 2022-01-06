import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Portfolio from './Portfolio';

const PrivateRoute = () => {
	return window.localStorage.getItem('user_id') ? <Portfolio /> : <Redirect to="/" />;
};

export default PrivateRoute;

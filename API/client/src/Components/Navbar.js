import React from 'react';
import { Link, NavLink, Outlet, location } from 'react-router-dom';
import Rocket from '../images/rocket-solid.svg';

const Navbar = () => {
	function logoutUser() {
		localStorage.removeItem('user_id');
		//console.log(window.localStorage.getItem('user_id'));
	}

	let logoutClass = window.localStorage.getItem('user_id')
		? 'nav-link ms-auto show-item'
		: 'nav-link ms-auto hide-item';
	let navItemClass = window.localStorage.getItem('user_id') ? 'nav-item show-item' : 'nav-item hide-item';
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<img
							src={Rocket}
							alt=""
							width="30"
							height="24"
							className="d-inline-block align-text-top me-2"
							id="rocket-logo"
						/>
						Stockfolio
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className={navItemClass}>
								<NavLink className="nav-link" to="/portfolio">
									Portfolio
								</NavLink>
							</li>
							<li className="nav-item" />
						</ul>
						<div className="ms-auto d-flex">
							<NavLink id="logout" className={logoutClass} to="/" onClick={() => logoutUser()}>
								<i className="fas fa-sign-out-alt" /> Logout
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
			<Outlet />
		</div>
	);
};

export default Navbar;

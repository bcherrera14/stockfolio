import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Rocket from '../images/rocket-solid.svg';

const Navbar = () => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
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
							<li className="nav-item">
								<NavLink className="nav-link" to="/">
									Landing
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/portfolio">
									Portfolio
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<Outlet />
		</div>
	);
};

export default Navbar;

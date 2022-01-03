import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Navbar = () => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img
							src="/docs/5.0/assets/brand/bootstrap-logo.svg"
							alt=""
							width="30"
							height="24"
							className="d-inline-block align-text-top"
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
								{/* <a className="nav-link active" aria-current="page" href="#">
									Home
								</a> */}
								<NavLink className="nav-link" to="/portfolio">
									Portfolio
								</NavLink>
							</li>
							<li className="nav-item">
								{/* <a className="nav-link" href="#">
									Features
								</a> */}
								<NavLink className="nav-link" to="/">
									Landing
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

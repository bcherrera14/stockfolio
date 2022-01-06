import React from 'react';
import Signup from './Signup';
import axios from 'axios';

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			modalShow: false
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.setModalShow = this.setModalShow.bind(this);
	}

	setModalShow(bool) {
		this.setState({
			modalShow: bool
		});
	}

	onFormSubmit(e) {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;
		if (username && password !== null) {
			this.setState({
				username,
				password
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.username !== this.state.username) {
			//console.log(this.state.username);
			//console.log(this.state.password);
			let config = {
				params: {
					username: this.state.username,
					password: this.state.password
				}
			};

			axios
				.get('http://localhost:5000/api/login', config)
				.then((response) => {
					console.log(response.data);
					window.localStorage.setItem('user_id', response.data.id);
					window.localStorage.setItem('name', response.data.firstname);
					this.props.navigate('/portfolio');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	render() {
		return (
			<div className="landing-page">
				<div className="landing-content d-flex flex-wrap justify-content-around align-items-center">
					<div className="app-description">
						<h1>Simulated Investing for</h1>
						<h1>
							Everyday <span>Traders.</span>
						</h1>
						<p className="text-secondary">
							Stockfolio is a place to buy and sell stocks using fake money. Track performance and find
							the right opportunity to invest.
						</p>
					</div>
					<div className="d-flex flex-column">
						<div className="card form-container d-flex flex-column py-4 mb-3">
							<form className=" d-flex flex-column " onSubmit={this.onFormSubmit} autoComplete="off">
								<h3 className="align-self-center ">Login</h3>
								<div className="form-group mt-4">
									{/* <label>Username</label> */}
									<div className="input-group">
										<span className="input-group-text" id="username-addon">
											<i className="fas fa-user" />
										</span>
										<input
											type="text"
											className="form-control"
											id="username"
											placeholder="Username"
										/>
									</div>
								</div>
								<div className="form-group mt-4">
									{/* <label>Password</label> */}
									<div className="input-group">
										<span className="input-group-text" id="password-addon">
											<i className="fas fa-lock" />
										</span>
										<input
											type="password"
											className="form-control"
											id="password"
											placeholder="Password"
										/>
									</div>
								</div>

								<button type="submit" className="btn btn-secondary btn-sm mt-4">
									Login
								</button>
							</form>
						</div>
						<div className="card">
							<div className="card-body d-flex align-items-center justify-content-between">
								<span>Need an account?</span>
								<button
									type="button"
									onClick={() => this.setModalShow(true)}
									className="btn btn-secondary btn-sm"
								>
									Sign up
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* <SignUp show={this.state.modalShow} onHide={() => this.setModalShow(false)} /> */}
				<Signup show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
			</div>
		);
	}
}

export default Landing;

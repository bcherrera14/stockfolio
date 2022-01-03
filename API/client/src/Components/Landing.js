import React from 'react';

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
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
			console.log(this.state.username);
			console.log(this.state.password);

			// let config = {
			// 	params: {
			// 		username: this.state.username,
			// 		password: this.state.password
			// 	}
			// };

			// axios
			// 	.get('http://localhost:5000/api/login', config)
			// 	.then((response) => {
			// 		console.log(response.data);
			// 		window.localStorage.setItem('user_id', response.data.id);
			// 		history.push('/portfolio');
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});
		}
	}

	render() {
		return (
			<div className="landing-page">
				<div className="landing-content d-flex justify-content-around align-items-center">
					<h1>App Descritpion</h1>
					<div className="d-flex flex-column">
						<div className="card form-container d-flex flex-column mb-3">
							<form className=" d-flex flex-column" onSubmit={this.onFormSubmit}>
								<h3 className="align-self-center ">Login</h3>
								<div className="form-group mt-3">
									<label>Username</label>
									<input
										type="text"
										className="form-control"
										id="username"
										placeholder="Enter username"
									/>
								</div>
								<div className="form-group mt-3">
									<label>Password</label>
									<input
										type="password"
										className="form-control"
										id="password"
										placeholder="Password"
									/>
								</div>

								<button type="submit" className="btn btn-secondary btn-sm mt-3">
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
			</div>
		);
	}
}

export default Landing;

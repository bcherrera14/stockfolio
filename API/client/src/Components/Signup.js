import React from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			username: '',
			password: '',
			userCreated: false
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	

	onFormSubmit(e) {
		e.preventDefault();
		const firstName = e.target.firstname.value;
		const lastName = e.target.lastname.value;
		const username = e.target.newusername.value;
		const passwordOne = e.target.passwordOne.value;
		const passwordTwo = e.target.passwordTwo.value;
		//console.log(firstName);
		//console.log(lastName);
		//console.log(username);

		if (firstName && lastName && username && passwordOne && passwordTwo !== null) {
			if (passwordOne === passwordTwo) {
				this.setState({
					firstName: firstName,
					lastName: lastName,
					username: username,
					password: passwordOne
				});
			} else {
				alert('Passwords do not match');
			}
		} else {
			alert('Please fill complete the form.');
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.username !== this.state.username) {
			//modalFormClass = "signup-form ms-auto me-auto hide-item";
			//modalSuccessClass = "show-item";
			console.log(this.state);
			let config = {
				params: {
					firstname: this.state.firstName,
					lastname: this.state.lastName,
					username: this.state.username,
					password: this.state.password
				}
			};

			axios
				.post('http://localhost:5000/api/users', null, config)
				.then((response) => {
					console.log(response);
					this.setState({
						userCreated: true
                    })
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	render() {
		let modalFormClass = this.state.userCreated ? "signup-form ms-auto me-auto hide-item" : "signup-form ms-auto me-auto show-item";
		let modalSuccessClass = this.state.userCreated ? "show-item" : "hide-item";
		
		return (
			<Modal {...this.props} size="" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Body>
					<div className={modalFormClass}>
						<form className="d-flex flex-column" onSubmit={this.onFormSubmit}>
							<h3 className="align-self-center mb-2">Sign Up</h3>
							<div className="form-group mb-2">
								<label>First Name</label>

								<input
									type="text"
									className="form-control form-control-sm"
									id="firstname"
									aria-describedby=""
								/>
							</div>
							<div className="form-group mb-2">
								<label>Last Name</label>
								<input
									type="text"
									className="form-control form-control-sm"
									id="lastname"
									aria-describedby=""
								/>
							</div>
							<div className="form-group mb-2">
								<label>Username</label>
								<input
									type="text"
									className="form-control form-control-sm"
									id="newusername"
									aria-describedby=""
								/>
							</div>
							<div className="form-group mb-2">
								<label>Password</label>
								<input type="password" className="form-control form-control-sm" id="passwordOne" />
							</div>
							<div className="form-group mb-2">
								<label>Retype Password</label>
								<input type="password" className="form-control form-control-sm" id="passwordTwo" />
							</div>

							<button type="submit" className="btn btn-secondary btn-sm mt-2">
								Sign Up
							</button>
						</form>
					</div>
					<div className={modalSuccessClass}>
						<div className="d-flex flex-column align-items-center justify-content-center">
							<div className="success-banner d-flex justify-content-center"><i className="far fa-check-circle"></i></div>
							<h1 className="mt-2">Great!</h1>
							<p>Your account has been created successfully.</p>
							<button onClick={()=> this.props.onHide() } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Login <i className="fas fa-arrow-right ms-2"></i></button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default Signup;

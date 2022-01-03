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
			password: ''
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
		console.log(firstName);
		console.log(lastName);
		console.log(username);

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

	render() {
		return (
			<Modal {...this.props} size="" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Body>
					<div className="signup-form ms-auto me-auto">
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
				</Modal.Body>
			</Modal>
		);
	}
}

export default Signup;

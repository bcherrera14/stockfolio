import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

class SellStock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: window.localStorage.getItem('user_id')
		};
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide} centered>
				<Modal.Body>
					<div className="sell-modal">
						<div className="d-flex flex-column align-items-center justify-content-center">
							<div className="d-flex justify-content-center">
								<i className="fas fa-exclamation-circle sell-warning" />
							</div>
							<h1 className="mt-2">Are you sure?</h1>
							<p>Are you sure you want to sell this stock?</p>
							<div>
								<button
									onClick={() => this.props.onHide()}
									type="button"
									className="btn btn-secondary mt-2"
									data-bs-dismiss="modal"
								>
									Cancel
								</button>
								<button
									id="sell-btn"
									onClick={() => this.props.onSell()}
									type="button"
									className="btn btn-success mt-2 ms-5"
									data-bs-dismiss="modal"
								>
									Sell
								</button>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default SellStock;

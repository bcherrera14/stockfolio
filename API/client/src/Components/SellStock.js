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
					<div className="stock-modal">
						<h3 className="align-self-center">Sell Stocks</h3>
						<hr />
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default SellStock;

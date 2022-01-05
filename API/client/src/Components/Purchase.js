import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

class Purchase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: window.localStorage.getItem('user_id'),
			stockSymbol: '',
			stockName: '',
			stockPrice: '',
			totalshares: 0,
			accountBalance: this.props.accountbalance,
			purchaseError: false,
			purchaseComplete: false
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.purchaseStocks = this.purchaseStocks.bind(this);
	}

	// componentDidMount() {
	// 	this.setState({ accountBalance: this.props.accountbalance });
	// 	//console.log(this.state.accountBalance);
	// 	console.log(this.props.accountbalance);
	// }

	componentDidUpdate(prevProps, prevState) {
		if (prevState.stockSymbol !== this.state.stockSymbol) {
			let config = {
				params: {
					stockSymbol: this.state.stockSymbol
				}
			};

			axios
				.get('http://localhost:5000/api/stocks/search', config)
				.then((response) => {
					console.log(response.data);
					this.setState({
						stockName: response.data.companyName,
						stockPrice: parseFloat(response.data.latestPrice)
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
		if (prevState.stockPrice !== this.state.stockPrice) {
			let searchResult = document.getElementById('stock-search-result');
			searchResult.style.visibility = 'visible';
		}
		if (prevState.accountBalance !== this.state.accountBalance && this.props.modalstate === 'false') {
			let searchResult = document.getElementById('stock-search-result');
			searchResult.style.visibility = 'hidden';
			this.props.onHide();
		}
	}

	onFormSubmit(e) {
		e.preventDefault();
		const stockSymbol = e.target.stockSymbol.value.toUpperCase();
		console.log(stockSymbol);
		this.setState({
			stockSymbol
		});
	}

	purchaseStocks(e) {
		e.preventDefault();
		const shares = e.target.shares.value;
		const purchasePrice = parseInt(shares) * this.state.stockPrice;
		const updatedAcountBalance = this.state.accountBalance - purchasePrice;
		//check funds available
		if (purchasePrice > this.state.accountBalance) {
			this.setState({
				purchaseError: true
			});
			return;
		}

		console.log(purchasePrice);
		console.log(shares);
		console.log(updatedAcountBalance);

		const config1 = {
			params: {
				user_id: this.state.user_id,
				companyname: this.state.stockName,
				totalshares: shares,
				purchaseprice: this.state.stockPrice,
				symbol: this.state.stockSymbol
			}
		};
		const config2 = {
			params: {
				user_id: this.state.user_id,
				accountbalance: updatedAcountBalance
			}
		};
		axios
			.all([
				axios.post('http://localhost:5000/api/stocks', null, config1),
				axios.post('http://localhost:5000/api/user/id', null, config2)
			])
			.then(
				axios.spread((data1, data2) => {
					console.log('data1', data1, 'data2', data2);
				})
			)
			.then(
				this.setState({
					accountBalance: updatedAcountBalance,
					purchaseError: false,
					purchaseComplete: true
				})
			)
			.catch((error) => {
				console.log(error);
			});

		// .then(window.location.reload());

		// if (purchasePrice < this.state.accountBalance) {
		// 	console.log(purchasePrice);
		// }
	}

	render() {
		let purchaseError = this.state.purchaseError
			? 'alert alert-danger d-flex align-items-center m-3 show-item'
			: 'alert alert-danger d-flex align-items-center m-3 hide-item';
		let purchaseComplete = this.state.purchaseComplete
			? 'alert alert-success d-flex align-items-center m-3 show-item'
			: 'alert alert-success d-flex align-items-center m-3 hide-item';
		return (
			<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Body>
					<div className="stock-modal">
						<form className="" onSubmit={this.onFormSubmit}>
							<h3 className="align-self-center">Purchase Stocks</h3>
							<hr />
							<p>
								Account Balance:{' '}
								<strong>
									{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
										this.state.accountBalance
									)}
								</strong>
							</p>

							<div className="input-group mb-3 stock-input">
								<input
									type="text"
									className="form-control"
									id="stockSymbol"
									aria-label="Stock Symbol"
									aria-describedby="stockSymbol"
								/>

								<button className="btn btn-outline-secondary" type="submit" id="button-addon2">
									Search
								</button>
							</div>
							<small id="stock-example" className="form-text text-muted">
								Please enter a ticker symbol. Ex: AAPL
							</small>
						</form>
						<div className="card m-3" id="stock-search-result">
							<form
								className="d-flex card-body form-row align-items-center justify-content-between"
								onSubmit={this.purchaseStocks}
							>
								<div className="col-5 my-1 d-flex justify-content-between">
									<span className="mr-auto">{this.state.stockName}</span>{' '}
									<strong>
										{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
											this.state.stockPrice
										)}
									</strong>
								</div>
								<div className="share-quantity d-flex justify-content-end input-group">
									<input
										id="shares"
										className="col-4 mr-4 form-control form-control-sm"
										type="text"
										placeholder="Quantity"
									/>
									<button type="submit" className="btn btn-primary btn-sm">
										Buy
									</button>
								</div>
							</form>
						</div>

						<div id="purchase-success" className={purchaseComplete}>
							<i className="fas fa-check-circle me-2" />
							<div>Purchase complete.</div>
						</div>
						<div id="purchase-error" className={purchaseError}>
							<i className="fas fa-exclamation-circle me-2" />
							<div>Insufficient funds.</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default Purchase;

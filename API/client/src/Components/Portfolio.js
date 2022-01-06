import React from 'react';
import axios from 'axios';
import SharesList from './SharesList';
import Purchase from './Purchase';
import SellStock from './SellStock';

class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: window.localStorage.getItem('user_id'),
			modalShow: false,
			sellModalShow: false,
			shares: [],
			accountBalance: 0,
			netAssets: 0,
			currentPrices: null,
			updateStockList: false,
			selectedStock: null,
			stockValue: 0
		};

		this.setModalShow = this.setModalShow.bind(this);
		this.getCurrentStockPrice = this.getCurrentStockPrice.bind(this);
		this.getUsersStocks = this.getUsersStocks.bind(this);
		this.getAccountBalance = this.getAccountBalance.bind(this);
		this.updateNetAssets = this.updateNetAssets.bind(this);
		this.deleteStock = this.deleteStock.bind(this);
		this.updateAccountBalance = this.updateAccountBalance.bind(this);
	}

	setModalShow(bool, modal, stockId, value) {
		if (modal === 'purchase') {
			this.setState({
				modalShow: bool
			});
		}
		if (modal === 'sell') {
			this.setState({
				sellModalShow: bool,
				selectedStock: stockId,
				stockValue: value
			});
		}
	}

	getUsersStocks() {
		let config = {
			params: {
				user: this.state.user_id
			}
		};
		axios
			.get('http://localhost:5000/api/stocks/id', config)
			.then((response) => {
				console.log('get user stocks!');
				this.setState({
					shares: response.data,
					updateStockList: false
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getCurrentStockPrice() {
		if (this.state.shares.length > 0) {
			let symbolList = [];
			this.state.shares.forEach((share) => symbolList.push(share.symbol));
			symbolList = [ ...new Set(symbolList) ];

			let config = {
				params: {
					stockList: symbolList.join(',')
				}
			};
			axios
				.get('http://localhost:5000/api/stocks/search/all', config)
				.then((response) => {
					//console.log(response.data);
					// console.log(this.state);
					this.setState({
						currentPrices: response.data,
						updateStockList: true
					});
					//console.log('get stock price error');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	deleteStock() {
		let updatedBalance = this.state.accountBalance + this.state.stockValue;
		console.log(`${this.state.selectedStock} sold for ${this.state.stockValue}`);
		console.log(`Your new balance is ${updatedBalance}`);
		const config1 = {
			params: {
				user_id: this.state.user_id,
				accountbalance: updatedBalance
			}
		};
		const config2 = {
			params: {
				stock_id: this.state.selectedStock
			}
		};

		axios
			.all([
				axios.get('http://localhost:5000/api/stock/delete', config2),
				axios.post('http://localhost:5000/api/user/id', null, config1)
			])
			.then(
				axios.spread((data1, data2) => {
					console.log('data1', data1, 'data2', data2);
				})
			)
			.then(() => {
				console.log('Stock removed');
				this.setState({
					accountBalance: updatedBalance,
					sellModalShow: false
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getAccountBalance() {
		let config = {
			params: {
				user_id: this.state.user_id
			}
		};
		axios
			.get('http://localhost:5000/api/user/id', config)
			.then((response) => {
				//console.log(parseFloat(response.data.accountbalance));
				this.setState({
					accountBalance: parseFloat(response.data.accountbalance)
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	updateAccountBalance(balance) {
		this.setState({
			accountBalance: balance
		});
	}

	updateNetAssets(netAssets) {
		// if (this.state.netAssets !== netAssets) {
		// 	this.setState({
		// 		netAssets: netAssets
		// 	});
		// 	//let Assets = netAssets;
		console.log(netAssets);
		//}
		//return this.state.netAssets;
		//console.log(this.state.netAssets);
	}

	componentDidMount() {
		this.getAccountBalance();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.shares !== this.state.shares) {
			this.getCurrentStockPrice();
			console.log('update stock list');
		}

		if (prevState.accountBalance !== this.state.accountBalance) {
			this.getUsersStocks();
			console.log('update account balance');
		}
	}

	render() {
		let name = window.localStorage.getItem('name');
		return (
			<div className="container">
				<div className="d-flex align-items-center m-4">
					<h1 className="mb-0">{name}'s Portfolio</h1>
					<button
						type="button"
						className="btn btn-primary ms-auto"
						onClick={() => this.setModalShow(true, 'purchase')}
					>
						Purchase Stocks
					</button>
				</div>
				<hr className="m-3" />
				<div className="ms-4 me-4 my-5 d-flex justify-content-start account-balance">
					<div className="d-flex">
						<h4 className="me-2">Account Balance:</h4>

						<h4>
							{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
								this.state.accountBalance
							)}
						</h4>
					</div>
					{/* <div className="d-flex">
						<h4 className="me-2">Net Assets: </h4>
						<h4>
							{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
								this.state.netAssets
							)}
						</h4>
					</div> */}
				</div>
				<hr className="m-3" />
				{this.state.shares.length < 1 ? <p className="ms-4">Purchase stocks.</p> : null}
				{!this.state.updateStockList && this.state.shares.length > 0 ? (
					<div className="d-flex justify-content-center mt-5">
						<div className="spinner-border text-secondary spinner-border-lg" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : null}
				{this.state.shares.length > 0 && this.state.updateStockList ? (
					<SharesList
						shares={this.state.shares}
						currentPrices={this.state.currentPrices}
						updateNetAssets={this.updateNetAssets}
						selectStock={this.setModalShow}
					/>
				) : null}
				{this.state.accountBalance !== 0 ? (
					<Purchase
						modalstate={this.state.modalShow.toString()}
						show={this.state.modalShow}
						onHide={() => this.setModalShow(false, 'purchase')}
						accountbalance={this.state.accountBalance}
						updateAccountBalance={this.updateAccountBalance}
					/>
				) : null}
				<SellStock
					show={this.state.sellModalShow}
					onHide={() => this.setModalShow(false, 'sell')}
					onSell={this.deleteStock}
				/>
			</div>
		);
	}
}

export default Portfolio;

import React from 'react';
import axios from 'axios';
import SharesList from './SharesList';
import Purchase from './Purchase';

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: window.localStorage.getItem('user_id'),
			modalShow: false,
			shares: [],
			accountBalance: 0,
			currentPrices: null
		};
		this.setModalShow = this.setModalShow.bind(this);
		this.getCurrentStockPrice = this.getCurrentStockPrice.bind(this);
		this.getUsersStocks = this.getUsersStocks.bind(this);
		this.getAccountBalance = this.getAccountBalance.bind(this);
	}

	setModalShow(bool) {
		this.setState({
			modalShow: bool
		});
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
				console.log(response.data);
				this.setState({
					shares: response.data
				});
				console.log(this.state);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getCurrentStockPrice() {
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
				console.log(response.data);
				// console.log(this.state);
				this.setState({
					currentPrices: response.data
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
				console.log(response.data);
				this.setState({
					accountBalance: parseFloat(response.data.accountbalance)
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.getAccountBalance();
		this.getUsersStocks();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.shares !== this.state.shares) {
			this.getCurrentStockPrice();
		}
	}

	render() {
		return (
			<div className="container">
				<div className="d-flex align-items-center m-4">
					<h1 className="mb-0">My Portfolio</h1>
					<button type="button" className="btn btn-primary ms-auto" onClick={() => this.setModalShow(true)}>
						Purchase Stocks
					</button>
				</div>
				<hr className="m-3" />
				<div className="ml-auto me-auto m-5 d-flex justify-content-around account-balance">
					<div className="d-flex">
						<h4 className="me-2">Account Balance:</h4>

						<h4>
							{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
								this.state.accountBalance
							)}
						</h4>
					</div>
					<div className="d-flex">
						<h4 className="me-2">Net Assets: </h4>
						<h4>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(10)}</h4>
					</div>
				</div>
				{this.state.currentPrices !== null ? (
					<SharesList shares={this.state.shares} currentPrices={this.state.currentPrices} />
				) : null}
				{this.state.accountBalance !== 0 ? (
					<Purchase
						modalstate={this.state.modalShow.toString()}
						show={this.state.modalShow}
						onHide={() => this.setModalShow(false)}
						accountbalance={this.state.accountBalance}
					/>
				) : null}
			</div>
		);
	}
}

export default Landing;

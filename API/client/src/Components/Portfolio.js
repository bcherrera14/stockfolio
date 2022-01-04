import React from 'react';
import axios from 'axios';
import SharesList from './SharesList';

class Landing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: window.localStorage.getItem('user_id'),
			modalShow: false,
			shares: [],
			accountBalance: 0,
			currentPrices: null,
			netAssets: 0
		};
		//this.setModalShow = this.setModalShow.bind(this);
		this.getCurrentStockPrice = this.getCurrentStockPrice.bind(this);
		this.getUsersStocks = this.getUsersStocks.bind(this);
		//this.getAccountBalance = this.getAccountBalance.bind(this);
		//this.sumNetAssets = this.sumNetAssets.bind(this);
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

	componentDidMount() {
		//this.getAccountBalance();
		this.getUsersStocks();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.shares !== this.state.shares) {
			this.getCurrentStockPrice();
		}
	}

	render() {
		return (
			<div>
				{this.state.currentPrices !== null ? (
					<SharesList
						sumNetAssets={this.sumNetAssets}
						shares={this.state.shares}
						currentPrices={this.state.currentPrices}
					/>
				) : null}
			</div>
		);
	}
}

export default Landing;

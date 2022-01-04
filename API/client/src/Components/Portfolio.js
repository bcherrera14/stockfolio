import React from 'react';
import axios from 'axios';

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
		//this.getCurrentStockPrice = this.getCurrentStockPrice.bind(this);
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

	componentDidMount() {
		//this.getAccountBalance();
		this.getUsersStocks();
	}

	render() {
		return (
			<div>
				<h1>Portfolio Page</h1>
			</div>
		);
	}
}

export default Landing;

import React from 'react';

class SharesCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { class: 'green-text' };
	}

	componentDidMount() {}

	currentSharesValue() {
		return this.props.stock.totalshares * this.props.currentPrice.quote.latestPrice;
	}

	sharesGain() {
		return (
			(this.props.currentPrice.quote.latestPrice - this.props.stock.purchaseprice) * this.props.stock.totalshares
		);
	}

	render() {
		const priceChange = this.props.currentPrice.quote.latestPrice - this.props.stock.purchaseprice;
		const gainTextColor = priceChange < 0 ? 'text-red' : 'text-green';
		const gainText = priceChange < 0 ? 'Loss' : 'Gain';

		return (
			<div className="shares-card card ml-5 me-5 mb-4 align-center">
				<div className="d-flex">
					<div className="d-flex flex-column me-auto m-3">
						<h4>{this.props.stock.companyname}</h4>
						<button type="button" className="sell-btn btn btn-secondary btn-sm mt-2">
							Sell
						</button>
					</div>
					<div className="d-flex flex-column m-3 shares-data">
						<div className="d-flex justify-content-between">
							<span className="me-auto">Current Value</span>{' '}
							<strong>
								{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
									this.currentSharesValue()
								)}
							</strong>
						</div>
						<div className="d-flex justify-content-between">
							<span className="me-auto">{gainText}</span>{' '}
							<strong className={gainTextColor}>
								{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
									this.sharesGain()
								)}
							</strong>
						</div>
						<div className="d-flex justify-content-between">
							<span>Total Shares</span> <strong>{this.props.stock.totalshares}</strong>
						</div>
						<div className="d-flex justify-content-between">
							<span>Current Price</span>{' '}
							<strong>
								{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
									this.props.currentPrice.quote.latestPrice
								)}
							</strong>
						</div>
						<div className="d-flex justify-content-between">
							<span>Purchased Price</span>{' '}
							<strong>
								{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
									this.props.stock.purchaseprice
								)}
							</strong>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SharesCard;

import axios from 'axios';
import React from 'react';
import SharesCard from './SharesCard';

const SharesList = ({ shares, currentPrices, sumNetAssets }) => {
	//console.log(currentPrices);
	let netAssets = 0;
	const sharesCards = shares.map((stock) => {
		const currentPrice = currentPrices[stock.symbol];
		const currentValue = stock.totalshares * currentPrice.quote.latestPrice;
		netAssets += currentValue;
		// console.log(currentPrices[stock.symbol]);
		// console.log(stock.totalshares * currentPrice.quote.latestPrice);
		// sumNetAssets(currentValue);
		// console.log('sharelist');

		return <SharesCard key={stock.stock_id} stock={stock} currentPrice={currentPrice} />;
	});
	//console.log(netAssets);

	// sumNetAssets(netAssets);

	return <div className="d-flex flex-column align-items-center">{sharesCards}</div>;
};

export default SharesList;

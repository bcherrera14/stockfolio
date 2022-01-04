import axios from 'axios';
import React from 'react';
import SharesCard from './SharesCard';

const SharesList = ({ shares, currentPrices }) => {
	let netAssets = 0;
	const sharesCards = shares.map((stock) => {
		const currentPrice = currentPrices[stock.symbol];
		const currentValue = stock.totalshares * currentPrice.quote.latestPrice;
		netAssets += currentValue;

		return <SharesCard key={stock.stock_id} stock={stock} currentPrice={currentPrice} />;
	});

	return <div className="d-flex flex-column align-items-center">{sharesCards}</div>;
};

export default SharesList;

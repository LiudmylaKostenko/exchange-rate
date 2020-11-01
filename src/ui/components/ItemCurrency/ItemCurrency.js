import React from 'react';
import { string, func } from 'prop-types';
import './ItemCurrency.scss';

const propTypes = {
	valueFrom: string,
	valueTo: string,
	bid: string,
	ask: string,
	onDeleteHandler: func,
	id: string,
};

const ItemCurrency = ({ valueFrom, valueTo, bid, ask, onDeleteHandler, id }) => {
	return (
		<div className="item-currency">
			<p>
				{valueFrom} / {valueTo}
			</p>
			<p>{bid}</p>
			<p>{ask}</p>
			<button onClick={() => onDeleteHandler(id)} className="remove">
				<i className="fas fa-trash-alt"></i>
			</button>
		</div>
	);
};
ItemCurrency.propTypes = propTypes;

export default ItemCurrency;

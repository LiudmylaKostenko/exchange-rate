import React from 'react';
import './ExchangeRatePageComponent.scss';
import { Spinner } from '../Spinner';
import ItemCurrency from '../ItemCurrency';
import HeaderComponent from '../../common/Header/HeaderComponent';
import { object, string, func, array, bool } from 'prop-types';

const propTypes = {
	user: object,
	userName: string,
	valueFrom: string,
	valueTo: string,
	bid: string,
	ask: string,
	lastUpdate: string,
	valueisLoading: bool,
	listOfCurrencies: array,
	onDeleteHandler: func,
	onChangeHandler: func,
	addNewCurrencyPair: func,
};

const ExchangeRatePageComponent = ({
	user,
	onChangeHandler,
	valueFrom,
	valueTo,
	valueisLoading,
	lastUpdate,
	addNewCurrencyPair,
	// eslint-disable-next-line react/prop-types
	updateTime,
	listOfCurrencies,
	onDeleteHandler,
}) => {
	return valueisLoading ? (
		<Spinner />
	) : (
		<>
			<HeaderComponent user={user} />
			<div className="container">
				<div className="content-settings">
					<p>Choose your settings pair</p>
					<div className="content-rules__currency">
						<select className="select-rules" name="valueFrom" onChange={onChangeHandler} value={valueFrom}>
							<option value="EUR">EUR</option>
							<option value="USD">USD</option>
							<option value="RUR">RUR</option>
							<option value="GBP">GBP</option>
							<option value="CAD">CAD</option>
							<option value="UAH">UAH</option>
						</select>
						<span>/</span>
						<select className="select-rules" name="valueTo" onChange={onChangeHandler} value={valueTo}>
							<option value="EUR">EUR</option>
							<option value="USD">USD</option>
							<option value="RUR">RUR</option>
							<option value="GBP">GBP</option>
							<option value="CAD">CAD</option>
							<option value="UAH">UAH</option>
						</select>
					</div>
					{/* eslint-disable-next-line react/button-has-type */}
					<button className="addItem" onClick={addNewCurrencyPair}>
						<i className="fas fa-plus"></i>
					</button>
				</div>
				<div className="content-title__settings">
					<div className="refresh-time__wrapper">
						<span>Refresh time</span>
						<select
							className="time-refresh"
							name="updateTime"
							onChange={onChangeHandler}
							value={updateTime}
						>
							<option value="5000">5 second</option>
							<option value="10000">10 seconds</option>
							<option value="15000">15 seconds</option>
							<option value="20000">20 seconds</option>
						</select>
					</div>
					<p className="data-time__refresh">{lastUpdate}</p>
				</div>
				<div className="title-column">
					<p>Symbols</p>
					<p>Bid</p>
					<p>Ask</p>
				</div>
				{listOfCurrencies.map((item) => {
					return (
						<ItemCurrency
							key={item.id}
							valueFrom={item.from}
							valueTo={item.to}
							bid={item.bid}
							ask={item.ask}
							id={item.id}
							onDeleteHandler={onDeleteHandler}
						/>
					);
				})}
			</div>
		</>
	);
};
ExchangeRatePageComponent.propTypes = propTypes;

export default ExchangeRatePageComponent;

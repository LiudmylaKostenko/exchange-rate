import React from 'react';
import { connect } from 'react-redux';
import ExchangeRatePageComponent from './ExchangeRatePageComponent';
import { getAll } from '../../../reduxStore/user/actions';
import { object, func, array, string, bool } from 'prop-types';

import {
	getCurrencies,
	addNewCurrencyPair,
	removeCurrencyPair,
	updateCurrencyPair,
	saveValueFrom,
	saveValueTime,
	saveValueTo,
} from '../../../reduxStore/currency/actions';

const propTypes = {
	pairOfCurrencies: object,
	user: object,
	currencyPairAPI: array,
	allCurrencies: array,
	addNewCurrencyPair: func,
	getAll: func,
	getCurrencies: func,
	saveValueFrom: func,
	saveValueTo: func,
	saveValueTime: func,
	isCurrencyLoading: bool,
	removeCurrencyPair: func,
	valueFrom: string,
	valueTo: string,
};

class ExchangeRatePageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lastUpdate: '',
		};

		this.intervalTime = 0; // help stop or start interval
		this.onAddHandler = this.onAddHandler.bind(this);
		this.onDateTimeUpdate = this.onDateTimeUpdate.bind(this);
		this.onDeleteHandler = this.onDeleteHandler.bind(this);
		this.onUpdateCurrency = this.onUpdateCurrency.bind(this);
		this.onFindHandler = this.onFindHandler.bind(this);
		this.onUpdateInterval = this.onUpdateInterval.bind(this);
		this.onReverseHandler = this.onReverseHandler.bind(this);
	}

	componentDidMount() {
		// eslint-disable-next-line no-shadow,react/prop-types
		const { getCurrencies, updateTime, getAll } = this.props;
		getAll();
		getCurrencies(); // get currencies from API
		this.onDateTimeUpdate(); // update time
		this.intervalTime = setInterval(() => this.onUpdateInterval(), updateTime); // set up update currency with interval
	}

	componentWillUnmount() {
		clearInterval(this.intervalTime);
	}

	onUpdateInterval = () => {
		this.onDateTimeUpdate();
		this.onUpdateCurrency();
	};

	onChangeHandler = (event) => {
		const { name, value } = event.target;
		// eslint-disable-next-line no-shadow,react/prop-types
		const { saveValueFrom, saveValueTo, saveValueTime, updateTime } = this.props;

		if (name === 'valueFrom') {
			saveValueFrom(value);
		}
		if (name === 'valueTo') {
			saveValueTo(value);
		}
		if (name === 'updateTime') {
			saveValueTime(value);
			// eslint-disable-next-line no-unused-expressions
			name === 'updateTime' // if refresh time changed - stop interval and start new
				? (clearInterval(this.intervalTime),
				  (this.intervalTime = setInterval(() => this.onUpdateInterval(), updateTime)))
				: null;
		}
	};

	onDeleteHandler = (id) => {
		// eslint-disable-next-line no-shadow
		const { removeCurrencyPair } = this.props;
		removeCurrencyPair(id);
	};

	onFindHandler = (arrayList, symbolOfSearching) => {
		// handler help searching at array ak, bid with concrete symbol
		const findSymbol = arrayList.filter((symbol) => {
			return symbol.symbol.toString().includes(symbolOfSearching);
		});
		return findSymbol.map((elem) => `${elem.symbol};${elem.ask};${elem.bid};${elem.id}`);
	};

	onReverseHandler = (pair) => {
		switch (pair) {
			case 'USDEUR':
				return 'EURUSD';
			case 'RUREUR':
				return 'EURRUR';
			case 'GBPEUR':
				return 'EURGBP';
			case 'CADUSD':
				return 'USDCAD';
			case 'UAHUSD':
				return 'USDUAH';
			case 'RURUSD':
				return 'USDRUR';
			default:
				return pair;
		}
	};

	onAddHandler = () => {
		// eslint-disable-next-line no-shadow
		const { valueFrom, valueTo, allCurrencies, addNewCurrencyPair, currencyPairAPI } = this.props;

		const reverseSymbol = this.onReverseHandler(`${valueFrom.concat(valueTo)}`);
		const currency = {
			from: valueFrom,
			to: valueTo, // added new currency pair with new  values
			symbol: reverseSymbol,
			id: Date.now().toString(),
		};

		// find at user list with currency includes symbol
		const alreadyHas = this.onFindHandler(allCurrencies, currency.symbol.toString().split(';')[0]);
		// if list already exist-- show alert
		if (currency.symbol === `${alreadyHas.toString().split(';')[0]}`) {
			alert(`Such pair already exist-${alreadyHas.toString().split(';')[0]}`);
		} else {
			const newAskBit = this.onFindHandler(currencyPairAPI, currency.symbol.toString().split(';')[0]);
			currency.bid = `${newAskBit.toString().split(';')[2]}`;
			currency.ask = `${newAskBit.toString().split(';')[1]}`;

			// eslint-disable-next-line no-unused-expressions
			currency.bid || currency.ask === undefined
				? ((currency.bid = 'no data available'), (currency.ask = 'no data available'))
				: '';

			addNewCurrencyPair(currency); // if not exist add new currency pair
		}
	};

	onDateTimeUpdate = () => {
		const date = new Date();
		const month = `0${date.getMonth() + 1}`;
		const year = date.getFullYear();
		const day = date.getDate();
		const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
		const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
		const seconds = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
		const generalTime = `${day}.${month}.${year} ${hour}:${minute}:${seconds}`;

		this.setState({ lastUpdate: generalTime }); // set last time update
	};

	onUpdateCurrency = () => {
		// eslint-disable-next-line no-shadow,react/prop-types
		const { allCurrencies, currencyPairAPI, updateCurrencyPair } = this.props;
		// eslint-disable-next-line no-plusplus
		for (let step = 0; step < allCurrencies.length; step++) {
			// eslint-disable-next-line no-irregular-whitespace
			// for each element from the user's list, we search for a match by symbol. if there is a change in supply or demand, replacements with values ​​from the API
			const findSymbolAtUserList = this.onFindHandler(
				allCurrencies,
				allCurrencies[step].symbol.toString().split(';')[0]
			);

			const findSymbolAtListApi = this.onFindHandler(
				currencyPairAPI,
				allCurrencies[step].symbol.toString().split(';')[0]
			);

			if (
				`${findSymbolAtUserList.toString().split(';')[2]}` !==
					`${findSymbolAtListApi.toString().split(';')[2]}` ||
				`${findSymbolAtUserList.toString().split(';')[1]}` !== `${findSymbolAtListApi.toString().split(';')[1]}`
			) {
				updateCurrencyPair({
					bid: `${findSymbolAtListApi.toString().split(';')[2]}`,
					ask: `${findSymbolAtListApi.toString().split(';')[1]}`,
					id: `${findSymbolAtUserList.toString().split(';')[3]}`,
				});
			}
		}
	};

	render() {
		// eslint-disable-next-line no-shadow,react/prop-types
		const { user, isCurrencyLoading, allCurrencies, getCurrencies, valueFrom, valueTo, updateTime } = this.props;
		const { bid, ask, lastUpdate } = this.state;

		return (
			<div>
				<ExchangeRatePageComponent
					user={user}
					valueFrom={valueFrom}
					valueTo={valueTo}
					bid={bid}
					ask={ask}
					updateTime={updateTime}
					listOfCurrencies={allCurrencies}
					getCurrencies={getCurrencies}
					valueisLoading={isCurrencyLoading}
					lastUpdate={lastUpdate}
					addNewCurrencyPair={this.onAddHandler}
					onChangeHandler={this.onChangeHandler}
					onDeleteHandler={this.onDeleteHandler}
				/>
			</div>
		);
	}
}

ExchangeRatePageContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
	return {
		user: state.authReducer.user,
		allCurrencies: state.currencyReducer.allCurrencies, // user list with currency pairs
		currencyPairAPI: state.currencyReducer.currencyPairAPI, // api from server at store
		isCurrencyLoading: state.currencyReducer.isCurrencyLoading, // is loaded data?
		valueFrom: state.currencyReducer.valueFrom, // value - what currency from
		valueTo: state.currencyReducer.valueTo, // value - what currency to
		updateTime: state.currencyReducer.updateTime, // value - what time to refresh
	};
};

const mapDispatchToProps = {
	getAll,
	getCurrencies,
	addNewCurrencyPair,
	removeCurrencyPair,
	updateCurrencyPair,
	saveValueTime,
	saveValueTo,
	saveValueFrom,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRatePageContainer);

import {
	GET_CURRENCY_PAIRS,
	ADD_CURRENCY_PAIRS,
	UPDATE_CURRENCY_PAIRS,
	DELETE_CURRENCY_PAIRS,
	SAVE_OPTION_TIME_UPDATE,
	SAVE_OPTION_VALUE_FROM,
	SAVE_OPTION_VALUE_TO,
} from './actionTypes';

const initialState = {
	isCurrencyLoading: true,
	allCurrencies: [
		{ from: 'EUR', to: 'USD', bid: '1.1673', ask: '1.1676', symbol: 'EURUSD', id: '1604145345868' },
		{ from: 'USD', to: 'CAD', bid: '1.3326', ask: '1.3329', symbol: 'USDCAD', id: '1604145410626' },
		{ from: 'USD', to: 'UAH', bid: '28.38', ask: '28.38', symbol: 'USDUAH', id: '1604145412162' },
	],
	valueFrom: 'EUR',
	valueTo: 'USD',
	updateTime: 5000,
};

export const currencyReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENCY_PAIRS:
			return {
				...state,
				currencyPairAPI: action.data, // return dataApi and loading is done
				isCurrencyLoading: false,
			};
		case ADD_CURRENCY_PAIRS:
			return {
				...state,
				allCurrencies: [...state.allCurrencies, { ...action.payload }], // return new array with added new pair pushed into the end
			};

		case UPDATE_CURRENCY_PAIRS:
			const editCurrencyPair = state.allCurrencies.map((currencyPair) => {
				// check currency pair with concrete id and update it
				if (currencyPair.id === action.payload.id) {
					currencyPair.ask = action.payload.ask;
					currencyPair.bid = action.payload.bid;
				}
				return currencyPair;
			});
			return {
				...state,
				allCurrencies: [...editCurrencyPair], // return array user list with update currency
			};

		case DELETE_CURRENCY_PAIRS:
			return {
				// remove from user list selected pair - filter return new array without item with selected id
				...state,
				allCurrencies: state.allCurrencies.filter((item) => item.id !== action.payload),
			};
		case SAVE_OPTION_VALUE_FROM:
			return {
				// save value from select what at currency pair we need (from)
				...state,
				valueFrom: action.payload,
			};
		case SAVE_OPTION_VALUE_TO:
			return {
				// save value from select what at currency pair we need (to)
				...state,
				valueTo: action.payload,
			};
		case SAVE_OPTION_TIME_UPDATE:
			return {
				// save value from select in what period we want to update currencies pair
				...state,
				updateTime: action.payload,
			};

		default:
			return state;
	}
};

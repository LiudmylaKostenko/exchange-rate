import { currenciesApi } from '../../service/api/currency';
import {
	GET_CURRENCY_PAIRS,
	ADD_CURRENCY_PAIRS,
	DELETE_CURRENCY_PAIRS,
	UPDATE_CURRENCY_PAIRS,
	SAVE_OPTION_TIME_UPDATE,
	SAVE_OPTION_VALUE_TO,
	SAVE_OPTION_VALUE_FROM,
} from './actionTypes';

export const getCurrencies = () => async (dispatch) => {
	const data = await currenciesApi.getApiCurrencies();
	dispatch({ type: GET_CURRENCY_PAIRS, data }); // get currencies from api and dispatch in store
};

export const updateCurrencyPair = (updatePair) => (dispatch) => {
	// dispatch action with type to store -- updating selected pair at users list from serverAPI
	dispatch({ type: UPDATE_CURRENCY_PAIRS, payload: updatePair });
};

export const addNewCurrencyPair = (currencyObject) => (dispatch) => {
	// dispatch action with type to store -- adding  new pair in users list of currencies
	dispatch({ type: ADD_CURRENCY_PAIRS, payload: currencyObject });
};

export const removeCurrencyPair = (id) => (dispatch) => {
	// dispatch action with type to store -- removing selected pair at users list
	dispatch({ type: DELETE_CURRENCY_PAIRS, payload: id });
};

export const saveValueFrom = (valueFrom) => (dispatch) => {
	// dispatch action with type to store -- saving selected currency from to store
	dispatch({ type: SAVE_OPTION_VALUE_FROM, payload: valueFrom });
};
export const saveValueTo = (valueTo) => (dispatch) => {
	// dispatch action with type to store -- saving selected currency from to store
	dispatch({ type: SAVE_OPTION_VALUE_TO, payload: valueTo });
};
export const saveValueTime = (time) => (dispatch) => {
	// dispatch action with type to store -- saving selected timeupdate to store
	dispatch({ type: SAVE_OPTION_TIME_UPDATE, payload: time });
};

import { requestFactory } from '../helpers/requestFactory';
import { BASE_API_URL } from '../../config';

// every method returns promise
export const currenciesApi = {
	getApiCurrencies() {
		const method = 'GET';
		return requestFactory(BASE_API_URL, method);
	},
};

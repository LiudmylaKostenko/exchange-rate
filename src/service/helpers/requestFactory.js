import fetch from 'isomorphic-fetch';
import { BASE_API_URL } from '../../config';

const requestFactory = async (url, method, data) => {
	try {
		const res = await fetch(BASE_API_URL, {
			// request for Api currencies
			method,
			body: data,
		});
		if (!res.ok) {
			throw new Error('Error!');
		}
		return res.json();
	} catch (err) {
		throw new Error(err);
	}
};

export { requestFactory };

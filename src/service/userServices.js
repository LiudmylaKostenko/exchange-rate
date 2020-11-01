import { authHeader } from './helpers/authHeader';
import config from 'config';
// userServices related put/get/post 'request' for user in Localstorage
export const serviceLogout = () => {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
};

const handleResponse = (response) => {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				serviceLogout();
				// eslint-disable-next-line no-restricted-globals
				location.reload(true);
			}
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		return data;
	});
};

export const serviceLogin = (userLogin, password) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userLogin, password }),
	};

	return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// store user details and jwt token in local storage
			localStorage.setItem('user', JSON.stringify(user));

			return user;
		});
};

export const serviceRegister = (user) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};

	return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
};

export const serviceGetAll = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
};

export const update = (user) => {
	const requestOptions = {
		method: 'PUT',
		headers: { ...authHeader(), 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	};

	return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
};

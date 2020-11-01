import { serviceRegister } from '../../service/userServices';
import { alertError, alertSuccess } from '../alert/actions';
import { USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from './actionTypes';
import { history } from '../store';

const request = (user) => {
	return { type: USER_REGISTER_REQUEST, user };
};
const success = (user) => {
	return { type: USER_REGISTER_SUCCESS, user };
};
const failure = (error) => {
	return { type: USER_REGISTER_FAILURE, error };
};

export const register = (user) => {
	return (dispatch) => {
		dispatch(request(user));

		serviceRegister(user).then(
			() => {
				dispatch(success()); // if success registration push at page Login
				history.push('/');
				dispatch(alertSuccess('Registration successful'));
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertError(error.toString()));
			}
		);
	};
};

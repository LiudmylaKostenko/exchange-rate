import { serviceLogin, serviceLogout } from '../../service/userServices';
import { USER_LOGIN_REQUEST, USER_LOGOUT } from './actionTypes';
import { USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from '../register/actionTypes';
import { alertError } from '../alert/actions';
import { history } from '../store';

const request = (user) => {
	return { type: USER_LOGIN_REQUEST, user }; // REGISTER_SUCCESS
};
const success = (user) => {
	return { type: USER_REGISTER_SUCCESS, user }; // REGISTER_SUCCESS
};
const failure = (error) => {
	return { type: USER_REGISTER_FAILURE, error };
};

export const logout = () => {
	serviceLogout();
	return { type: USER_LOGOUT };
};

export const login = (userLogin, password) => {
	// action user authentification , use login password
	return (dispatch) => {
		dispatch(request({ userLogin })); // if dispatch success POST in localstorage push at change rates
		serviceLogin(userLogin, password).then(
			(user) => {
				dispatch(success(user));
				history.push('/');
			},
			(error) => {
				dispatch(failure(error.toString()));
				dispatch(alertError(error.toString())); // error alert error
			}
		);
	};
};

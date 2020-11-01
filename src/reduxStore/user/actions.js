import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from './actionsTypes';
import { serviceGetAll } from '../../service/userServices';

const request = () => {
	return { type: GET_USERS_REQUEST };
};

const success = (users) => {
	return { type: GET_USERS_SUCCESS, users };
};

const failure = (error) => {
	return { type: GET_USERS_FAILURE, error };
};

export const getAll = () => {
	return (dispatch) => {
		dispatch(request()); // get users

		serviceGetAll().then(
			(users) => dispatch(success(users)),
			(error) => dispatch(failure(error.toString()))
		);
	};
};

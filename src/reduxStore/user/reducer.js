import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from './actionsTypes';

export const usersReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_USERS_REQUEST:
			return {
				loading: true,
			};
		case GET_USERS_SUCCESS:
			return {
				items: action.users, // our user is store
			};
		case GET_USERS_FAILURE:
			return {
				error: action.error,
			};
		default:
			return state;
	}
};

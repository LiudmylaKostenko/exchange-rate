import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from './actionTypes';

export const registerReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { registering: true };
		case USER_REGISTER_SUCCESS: // return in store success or failure
			return {};
		case USER_REGISTER_FAILURE:
			return { registering: false };
		default:
			return state;
	}
};

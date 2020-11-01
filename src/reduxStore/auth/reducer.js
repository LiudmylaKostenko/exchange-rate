import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from './actionTypes';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: action.user, // return isLoginIn user and current user in store
			};
		case USER_LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user,
			};
		case USER_LOGIN_FAILURE:
			return {};
		case USER_LOGOUT: // if failure return {}
			return {};
		default:
			return state;
	}
};

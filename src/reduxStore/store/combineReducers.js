import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { alertReducer } from '../alert/reducer';
import { usersReducer } from '../user/reducer';
import { authReducer } from '../auth/reducer';
import { registerReducer } from '../register/reducer';
import { currencyReducer } from '../currency/reducer';

export const rootReducer = (
	history // combine reducer connects all reducer for work with store
) =>
	combineReducers({
		router: connectRouter(history),
		currencyReducer,
		alertReducer,
		usersReducer,
		authReducer,
		registerReducer,
	});

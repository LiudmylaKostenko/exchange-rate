import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './combineReducers';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist'; // imports from redux-persist
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const history = createBrowserHistory(); // use browserhistory

const persistConfig = {
	// configuration object for redux-persist
	key: 'currencyPairs',
	storage, // define which storage to use
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history)); // create a persisted reducer

const middlewares = [thunkMiddleware, routerMiddleware(history)]; // use middlewares to route in SPA, use functions in dispatch (not only actiontypes)

const enhancers = [applyMiddleware(...middlewares)]; // enchancer our store and applymiddleware will execute in order

const store = createStore(persistedReducer, composeWithDevTools(...enhancers));

const persistor = persistStore(store);

export { store, persistor }; // return own made store configuration and persistor

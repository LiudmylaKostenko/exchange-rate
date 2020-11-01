import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './reduxStore/store';
import { configureLocalData } from './service/helpers/localData';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './ui/components/ErrorBoundary';
import { Spinner } from './ui/components/Spinner';

configureLocalData();

// store - own configure store redux
// using provider to share data from store to all inside if need
// if error wiil show window that something is wrong..
// Spinner passed to loading where persistor is being used

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={<Spinner />} persistor={persistor}>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

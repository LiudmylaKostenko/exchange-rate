import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ProtectedRoutes } from './ui/routes/ProtectedRoutes';
import { history } from './reduxStore/store';
import ExchangeRate from './ui/components/ExchangeRatePage/ExchangeRatePageContainer';
import LoginPage from './ui/components/LoginPage/LoginPageContainer';
import RegistrationPage from './ui/components/RegistrationPage/RegistrationPageContainer';
import { alertClear } from './reduxStore/alert/actions';
import { func, object, string } from 'prop-types';

const propTypes = {
	alert: object,
	message: string,
	type: string,
	clearAlerts: func,
};

class App extends Component {
	constructor(props) {
		super(props);
		const { alertClear } = this.props;

		history.listen((location, action) => {
			//  clear alert on location change
			alertClear();
		});
	}

	// alert from reducer with message
	render() {
		const { alert } = this.props;
		return (
			<div className="main-wrapper">
				<div className="container">
					<div className="content-alert">
						{alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
						<ConnectedRouter history={history}>
							<Switch>
								<ProtectedRoutes exact path="/" component={ExchangeRate} />
								<Route path="/login" component={LoginPage} />
								<Route path="/register" component={RegistrationPage} />
								<Redirect from="*" to="/" />
							</Switch>
						</ConnectedRouter>
					</div>
				</div>
			</div>
		);
	}
}
App.propTypes = propTypes;

const mapStateToProps = (state) => {
	return {
		alert: state.alertReducer,
	};
};
// state data and actions then needs this component from redux store
const mapDispatchToProps = {
	alertClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

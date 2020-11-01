import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPageComponent from './LoginPageComponent';
import { login, logout } from '../../../reduxStore/auth/actions';
import { object, func } from 'prop-types';
import { getCurrencies } from '../../../reduxStore/currency/actions';

const propTypes = {
	loggingIn: object,
	login: func,
	getCurrencies: func,
};

class LoginPageContainer extends Component {
	constructor(props) {
		super(props);

		this.props.logout();

		this.state = {
			userLogin: '',
			password: '',
			submitted: false,
		};

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}

	onChangeHandler(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	onSubmitHandler(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { userLogin, password } = this.state;
		if (userLogin && password) {
			this.props.login(userLogin, password); // user login in password and login
			this.props.getCurrencies(); // get user currencies
		}
	}

	render() {
		const { loggingIn } = this.props;
		const { userLogin, password, submitted } = this.state;
		return (
			<div>
				<LoginPageComponent
					onSubmitHandler={this.onSubmitHandler}
					onChangeHandler={this.onChangeHandler}
					loggingIn={loggingIn}
					userLogin={userLogin}
					password={password}
					submitted={submitted}
				/>
			</div>
		);
	}
}

LoginPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
	return {
		loggingIn: state.authReducer, // is logined user
		currencyPairAPI: state.currencyReducer.currencyPairAPI, // list Currency from API
	};
};

const mapDispatchToProps = {
	login,
	logout,
	getCurrencies,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);

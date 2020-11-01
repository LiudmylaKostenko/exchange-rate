import React, { Component } from 'react';
import RegistrationPageComponent from './RegistrationPageComponent';
import { connect } from 'react-redux';
import { register } from '../../../reduxStore/register/actions';
import { func, object } from 'prop-types';

const propTypes = {
	registering: object,
	register: func,
};

class RegistrationPageContainer extends Component {
	// registration component with logics about change data in fields
	constructor(props) {
		super(props);

		this.state = {
			user: {
				userName: '',
				userLogin: '',
				email: '',
				password: '',
			},
			submitted: false,
		};

		this.onChangeHandler = this.onChangeHandler.bind(this); // reaction change input value
		this.onSubmitHandler = this.onSubmitHandler.bind(this); // reaction when push register  data
	}

	onChangeHandler(event) {
		const { name, value } = event.target;
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				[name]: value,
			},
		});
	}

	// changes in the value of the input write the value of the property
	onSubmitHandler(event) {
		event.preventDefault();
		// if all params register user

		this.setState({ submitted: true });
		const { user } = this.state;
		if (user.userName && user.userLogin && user.email && user.password) {
			this.props.register(user);
		}
	}

	render() {
		const { registering } = this.props;
		const { user, submitted } = this.state; // destructuring and broadcast data from HOC
		return (
			<div>
				<RegistrationPageComponent
					onSubmitHandler={this.onSubmitHandler}
					onChangeHandler={this.onChangeHandler}
					registering={registering}
					user={user}
					submitted={submitted}
				/>
			</div>
		);
	}
}

RegistrationPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
	return {
		registering: state.registerReducer,
	};
};

const mapDispatchToProps = {
	register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPageContainer);

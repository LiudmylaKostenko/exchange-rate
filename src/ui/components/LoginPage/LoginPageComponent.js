import React from 'react';
import { Link } from 'react-router-dom';
import FooterComponent from '../../common/Footer/FooterContainer';
import './LoginPageComponent.scss';
import { func, bool, string, object } from 'prop-types';

const propTypes = {
	onSubmitHandler: func,
	onChangeHandler: func,
	onRegistrationHandler: func,
	loggingIn: object,
	submitted: bool,
	userLogin: string,
	password: string,
};

const LoginPageComponent = ({ onSubmitHandler, onChangeHandler, userLogin, password, submitted }) => {
	return (
		<>
			<div className="login-wrapper">
				<h2>Login please</h2>
				<form name="form" onSubmit={onSubmitHandler}>
					<div className={`form-group${submitted && !userLogin ? ' has-error' : ''}`}>
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
						<label htmlFor="userLogin" className="userLogin">
							Login
						</label>
						<input
							type="text"
							className="form-control"
							name="userLogin"
							placeholder="enter your login"
							value={userLogin}
							onChange={onChangeHandler}
							autoFocus
						/>
						{submitted && !userLogin && <div className="help-block">User login is required</div>}
					</div>
					<div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
						<label htmlFor="password" className="password">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							name="password"
							placeholder="enter your password"
							value={password}
							onChange={onChangeHandler}
						/>
						{submitted && !password && <div className="help-block">Password is required</div>}
					</div>
					<div className="form-group">
						{/* eslint-disable-next-line react/button-has-type */}
						<button className="login-btn">Login</button>
						{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
						<Link to="/register" className="btn-signUp">
							Sign up
						</Link>
					</div>
				</form>
			</div>
			<FooterComponent />
		</>
	);
};

LoginPageComponent.propTypes = propTypes;

export default LoginPageComponent;

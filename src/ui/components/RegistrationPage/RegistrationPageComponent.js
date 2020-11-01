import React from 'react';
import { Link } from 'react-router-dom';
import { func, object, bool } from 'prop-types';
import './RegistrationPageComponent.scss';

const propTypes = {
	onSubmitHandler: func,
	onChangeHandler: func,
	onCancelHandler: func,
	registering: object,
	user: object,
	submitted: bool,
};

const RegistrationPageComponent = ({ onSubmitHandler, onChangeHandler, user, submitted }) => {
	return (
		<div className="register-wrapper">
			<h2>Register</h2>
			<form name="form" onSubmit={onSubmitHandler}>
				<div className={`form-group${submitted && !user.userName ? ' has-error' : ''}`}>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label htmlFor="userName">Name</label>
					<input
						type="text"
						className="form-control"
						name="userName"
						pattern="^[a-zA-Z]+$"
						minLength="3"
						maxLength="10"
						placeholder="enter your name"
						value={user.userName}
						onChange={onChangeHandler}
						autoFocus
					/>
					{submitted && !user.userName && <div className="help-block">Username is required</div>}
				</div>
				<div className={`form-group${submitted && !user.userLogin ? ' has-error' : ''}`}>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label htmlFor="userLogin">Login</label>
					<input
						type="text"
						className="form-control"
						name="userLogin"
						minLength="5"
						maxLength="20"
						placeholder="enter your login"
						value={user.userLogin}
						onChange={onChangeHandler}
					/>
					{submitted && !user.userLogin && <div className="help-block">userLogin is required</div>}
				</div>
				<div className={`form-group${submitted && !user.email ? ' has-error' : ''}`}>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label htmlFor="email">E-mail</label>
					<input
						type="text"
						className="form-control"
						name="email"
						pattern="[a-z0-9]{5,10}@[a-z]{5,8}\.[a-z]{2,3}"
						minLength="6"
						maxLength="30"
						placeholder="format..a-z0-9@."
						value={user.email}
						onChange={onChangeHandler}
					/>
					{submitted && !user.email && <div className="help-block">Email is required</div>}
				</div>
				<div className={`form-group${submitted && !user.password ? ' has-error' : ''}`}>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label htmlFor="password" className="password">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						minLength="8"
						name="password"
						placeholder="enter your password"
						value={user.password}
						onChange={onChangeHandler}
					/>
					{submitted && !user.password && <div className="help-block">Password is required</div>}
				</div>
				<div className="form-group">
					{/* eslint-disable-next-line react/button-has-type */}
					<button className="btn-register">Register</button>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<Link to="/login" className="btn-signIn">
						Sign in
					</Link>
				</div>
			</form>
		</div>
	);
};
RegistrationPageComponent.propTypes = propTypes;

export default RegistrationPageComponent;

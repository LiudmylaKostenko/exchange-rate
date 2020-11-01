import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderComponent.scss';
import logo from '../../components/ExchangeRatePage/assets/logo.png';
import { object } from 'prop-types';

const propTypes = {
	user: object,
};

const HeaderComponent = ({ user }) => (
	<header className="header">
		<div className="describe-content">
			<img src={logo} className="logo" alt="logo" />
			<span className="describe-logo">Online Exchange Rate</span>
		</div>
		<h1>Hi {user.userLogin}!</h1>
		<p>You're logged in exchange rate currencies online </p>
		<p>
			<Link to="/login">Logout</Link>
		</p>
	</header>
);
HeaderComponent.propTypes = propTypes;

export default HeaderComponent;

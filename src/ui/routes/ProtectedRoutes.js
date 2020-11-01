import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { object } from 'prop-types';

const propTypes = {
	location: object,
	component: object,
};

export const ProtectedRoutes = (
	{ component: Component, ...rest } // if not login user redirect for login
) => (
	<Route
		{...rest}
		render={(props) =>
			localStorage.getItem('user') ? (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
				// push('/login')
			)
		}
	/>
);

ProtectedRoutes.propTypes = propTypes;

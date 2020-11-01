import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent';
import { connect } from 'react-redux';
import { string, object } from 'prop-types';

const propTypes = {
	path: string,
	name: string,
	user: object,
};

// eslint-disable-next-line react/prefer-stateless-function
class HeaderContainer extends Component {
	render() {
		const { path, user } = this.props;
		return path !== '/login' && path !== '/register' ? <HeaderComponent user={user.name} /> : null;
		// path from connected router helps to decide view or not component on concretic pages
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.router.location.pathname,
		user: state.authReducer.user,
	};
};
HeaderContainer.propTypes = propTypes;

export default connect(mapStateToProps, null)(HeaderContainer);

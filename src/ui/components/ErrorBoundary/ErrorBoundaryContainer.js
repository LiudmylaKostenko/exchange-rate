import React from 'react';
import ErrorBoundaryComponent from './ErrorBoundaryComponent';

class ErrorBoundaryContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch() {
		this.setState({
			hasError: true,
		});
	}

	render() {
		if (this.state.hasError) {
			return <ErrorBoundaryComponent />;
		}

		return this.props.children;
	}
}

export default ErrorBoundaryContainer;

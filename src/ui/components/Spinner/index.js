import React from 'react';
import './spinner.scss';
import SpinnerImg from './assets/Spinner_font_awesome.svg';

const Spinner = () => {
	// spinner when data is not loaded yet
	return (
		<div className="wrapper">
			<img className="spinnerStyle" src={SpinnerImg} alt="spinner" />
		</div>
	);
};

export { Spinner };

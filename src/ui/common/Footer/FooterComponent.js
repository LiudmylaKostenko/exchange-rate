import React from 'react';
import './FooterComponent.scss';

const FooterComponent = () => (
	<footer className="contacts">
		<div className="contacts-wrapper" id="contact">
			<h2>Online Exchange Rate</h2>
			<p>change your currency with us</p>
			<div className="contacts-icons">
				<a href="https://www.facebook.com/">
					<i className="fab fa-facebook-f" />
				</a>
				<a href="https://twitter.com/">
					<i className="fab fa-twitter" />
				</a>
				<a href="https://www.linkedin.com/">
					<i className="fab fa-linkedin-in" />
				</a>
				<a href="https://www.youtube.com/">
					<i className="fab fa-youtube" />
				</a>
				<a href="https://www.pinterest.com/">
					<i className="fab fa-pinterest" />
				</a>
			</div>
		</div>
	</footer>
);

export { FooterComponent };

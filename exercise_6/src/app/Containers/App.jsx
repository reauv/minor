import 'Stylesheets/reset';
import 'Stylesheets/shared';

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import Auth from 'Components/Auth';
import Header from 'Components/Header/Header';

const Tracks = ({ children }) =>
	<div>
		<Header />
		<Auth />
		<div className="wrapper">
			{children}
		</div>
	</div>;

export default connect()(Tracks);


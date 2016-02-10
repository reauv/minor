import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

const Tracks = ({ children }) =>
	<div>
		<h1>Soundcloud</h1>
		{children}
	</div>;

export default connect()(Tracks);


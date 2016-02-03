import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

const App = ({ dispatch, children }) =>
	<div>
		<h1>App</h1>
		<ul>
			<li onClick={() => dispatch(routeActions.push('/foo')) }>
				Foo
			</li>
			<li onClick={() => dispatch(routeActions.push('/bar')) }>
				Bar
			</li>
		</ul>
		{children}
	</div>;

export default connect()(App);

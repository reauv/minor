import 'Stylesheets/reset';
import 'Stylesheets/shared';

import React from 'react';
import Auth from 'Components/Auth';
import Header from 'Components/Header/Header';
import PlayerContainer from 'Containers/PlayerContainer';

const App = ({ children }) =>
	<div>
		<Header />
		<Auth />
		<div className="wrapper">
			{children}
		</div>
		<PlayerContainer />
	</div>;

export default App;


import 'Stylesheets/reset';
import 'Stylesheets/shared';

import React from 'react';
import Header from 'Components/Header/Header';
import PlayerContainer from 'Containers/PlayerContainer';

const App = ({ children }) =>
	<div>
		<Header />
		<div className="wrapper">
			{children}
		</div>
		<PlayerContainer />
	</div>;

export default App;


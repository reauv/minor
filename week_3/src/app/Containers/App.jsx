import 'Stylesheets/reset';
import 'Stylesheets/shared';

import React from 'react';
import Header from 'Components/Header/Header';

const App = ({ children }) =>
	<div>
		<Header />
		<div className="wrapper">
			{children}
		</div>
	</div>;

export default App;


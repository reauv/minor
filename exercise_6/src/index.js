// Load deps
import store from 'Store';
import React from 'react';
import ReactDOM from 'react-dom';
import Soundcloud from 'soundcloud';
import { Provider } from 'react-redux';
import { syncHistory } from 'react-router-redux';
import * as SoundcloudActions from 'Actions/SoundcloudActions';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'Containers/App';
import Tracks from 'Containers/Tracks';

// Set up Soundcloud
Soundcloud.initialize({
	client_id: '2ffdaf326d7cea79aad3eb25b3c80ca8',
});

// Render the application
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Tracks}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);


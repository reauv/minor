// Load deps
import env from 'env';
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
import TrackDetailContainer from 'Containers/TrackDetailContainer';

// Set up Soundcloud
Soundcloud.initialize({
	client_id: env.SOUNDCLOUD_ID,
	redirect_uri: 'http://0.0.0.0:8080/callback.html',
});

// Render the application
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Tracks}/>
				<Route path='/track/:id' component={TrackDetailContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);


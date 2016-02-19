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
import AuthContainer from 'Containers/AuthContainer';
import FeedContainer from 'Containers/FeedContainer';
import TrackDetailContainer from 'Containers/TrackDetailContainer';

// Set up Soundcloud
Soundcloud.initialize({
	client_id: env.SOUNDCLOUD_ID,
	redirect_uri: 'http://0.0.0.0:8080/callback.html',
	oauth_token: store.getState().user.token,
});

function auth(nextState, replace) {
	if (store.getState().user.token) {
		return true;
	}

	replace('/login');
}

function guest(nextState, replace) {
	if (!store.getState().user.token) {
		return true;
	}

	replace('/');
}

// Render the application
ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<Route path='/login' component={AuthContainer} />
				<Route path='/track/:id' component={TrackDetailContainer} />
				<IndexRoute component={FeedContainer} onEnter={auth} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);


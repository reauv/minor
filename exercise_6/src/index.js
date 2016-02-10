// Load deps
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from 'Reducers';
import thunk from 'redux-thunk';
import Soundcloud from 'soundcloud';
import { assignAll } from 'redux-act';
import { Provider } from 'react-redux';
import { syncHistory } from 'react-router-redux';
import * as SoundcloudActions from 'Actions/SoundcloudActions';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import App from 'Components/App';
import Tracks from 'Components/Tracks';

// Set up router middleware
const reduxRouterMiddleware = syncHistory(browserHistory);

// Set up store
const store = createStore(
	reducer,
	{},
	compose(
		applyMiddleware(reduxRouterMiddleware, thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

// Bind actions to the store
assignAll(SoundcloudActions, store);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

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


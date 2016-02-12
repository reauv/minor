import reducer from 'Reducers';
import thunk from 'redux-thunk';
import { assignAll } from 'redux-act';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import * as userActions from 'Actions/UserActions';
import * as soundcloudActions from 'Actions/SoundcloudActions';

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

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

// Assign functions to the store
assignAll(soundcloudActions, store);
assignAll(userActions, store);

export default store;

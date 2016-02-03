// Load deps
import React from 'react';
import ReactDOM from 'react-dom';
import reducers from 'App/reducers';
import App from 'App/Components/App';
import Foo from 'App/Components/Foo';
import Bar from 'App/Components/Bar';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// Set up the reducer
const reducer = combineReducers(Object.assign({}, reducers, {
	routing: routeReducer,
}));

// Set up router middleware
const reduxRouterMiddleware = syncHistory(browserHistory);

// Set up store
const store = createStore(
	reducer,
	compose(
		applyMiddleware(reduxRouterMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

// Render the application
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

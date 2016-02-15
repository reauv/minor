import { combineReducers } from 'redux';
import user from 'Reducers/UserReducer';
import soundcloud from 'Reducers/SoundcloudReducer';
import { routeReducer } from 'react-router-redux';

export default combineReducers({
	soundcloud,
	user,
	routing: routeReducer,
});

import { combineReducers } from 'redux';
import soundcloud from 'Reducers/SoundcloudReducer';
import { routeReducer } from 'react-router-redux';

export default combineReducers({
	soundcloud,
	routing: routeReducer,
});

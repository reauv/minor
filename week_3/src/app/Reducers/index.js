import { combineReducers } from 'redux';
import user from 'Reducers/UserReducer';
import player from 'Reducers/PlayerReducer';
import soundcloud from 'Reducers/SoundcloudReducer';
import { routeReducer } from 'react-router-redux';

export default combineReducers({
	user,
	player,
	soundcloud,
	routing: routeReducer,
});

import { createReducer } from 'redux-act';
import * as actions from 'Actions/SoundcloudActions';

const initialState = {
	fetchingTracks: 'idle',
	tracks: [],
}

export default createReducer({

	/**
	 * Fetch tracks
	 */
	[actions.fetchingTracks]: (state) => {
		state.fetchingTracks = loading;
		return state;
	}

}, initialState);


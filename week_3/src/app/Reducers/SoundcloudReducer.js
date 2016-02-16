import env from 'env';
import { createReducer } from 'redux-act';
import * as actions from 'Actions/SoundcloudActions';
import { streamTrack } from 'Sources/SoundcloudSource';

const initialState = {
	key: env.SOUNDCLOUD_ID,
	tracks: [],
	track: null,
	fetchingTrack: 'idle',
	streamingTrack: 'idle',
	fetchingTracks: 'idle',
}

export default createReducer({

	/**
	 * Fetch tracks
	 */
	[actions.fetchingTracks]: (state) => {
		return {...state,
			fetchingTracks: 'loading',
		};
	},
	[actions.fetchedTracks]: (state, payload) => {
		return {...state,
				fetchingTracks: 'done',
				tracks: payload,
		};
	},
	[actions.fetchingTracksFailed]: (state, error) => {
		return {...state,
				fetchingTracks: 'failed',
		};
	},

	/**
	 * Fetch single track
	 */
	[actions.fetchingTrack]: (state) => {
		return {...state,
			track: null,
			fetchingTrack: 'loading',
		};
	},
	[actions.fetchedTrack]: (state, payload) => {
		return {...state,
				track: payload,
				fetchingTrack: 'done',
		};
	},
	[actions.fetchingTrackFailed]: (state, error) => {
		return {...state,
				fetchingTrack: 'failed',
		};
	},



}, initialState);


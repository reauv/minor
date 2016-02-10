import { createReducer } from 'redux-act';
import * as actions from 'Actions/SoundcloudActions';

const initialState = {
	streamingTrack: 'idle',
	fetchingTracks: 'idle',
	tracks: [],
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

	/**
	 * Successfully fetched tracks
	 */
	[actions.fetchedTracks]: (state, payload) => {
		return {...state,
				fetchingTracks: 'done',
				tracks: payload,
		};
	},

	/**
	 * Failed to fetch tracks
	 */
	[actions.fetchingTracksFailed]: (state, error) => {
		return {...state,
				fetchingTracks: 'failed',
		};
	},

	[actions.streamingTrack]: (state) => {
		return {...state,
			streamingTrack: 'loading',
		};
	},

	[actions.streamedTrack]: (state, player) => {
		player.play();

		return {...state,
			streamingTrack: 'done',
		};
	},

	[actions.streamingTrackFailed]: (state) => {
		return {...state,
			streamingTrack: 'failed',
		};
	}



}, initialState);


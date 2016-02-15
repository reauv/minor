import { createReducer } from 'redux-act';
import * as actions from 'Actions/SoundcloudActions';
import { streamTrack } from 'Sources/SoundcloudSource';

const initialState = {
	tracks: [],
	track: null,
	player: null,
	playing: false,
	currentTrack: null,
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

	/**
	 * Stream track
	 */
	[actions.streamingTrack]: (state) => {
		return {...state,
			streamingTrack: 'loading',
		};
	},

	[actions.streamedTrack]: (state, player) => {
		player.play();

		return {...state,
			playing: true,
			player: player,
			streamingTrack: 'done',
			currentTrack: player.options.soundId,
		};
	},

	[actions.streamingTrackFailed]: (state) => {
		return {...state,
			streamingTrack: 'failed',
		};
	},

	/**
	 * Player actions
	 */
	[actions.playTrack]: (state, trackId) => {
		if (state.player) {
			state.player.play();
		}

		return {...state,
			playing: true
		};
	},
	[actions.pauseTrack]: (state) => {
		if (state.player) {
			state.player.pause();
		}

		return {...state,
			playing: false,
		};
	}

}, initialState);


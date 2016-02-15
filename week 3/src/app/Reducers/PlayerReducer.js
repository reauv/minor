import { createReducer } from 'redux-act';
import * as actions from 'Actions/PlayerActions';

const initialState = {
	position: 0,
	player: null,
	playing: false,
	currentTrack: null,
	streamingTrack: 'idle',
}

export default createReducer({

	/**
	 * Stream track
	 */
	[actions.streamingTrack]: (state) => {
		return {...state,
			streamingTrack: 'loading',
		};
	},

	[actions.streamedTrack]: (state, player) => {
		if (!state.player) {
			player.on('time', () => { actions.timeChanged() });
		}

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
	},

	[actions.timeChanged]: (state) => {
		return {...state,
			position: state.player.controller.getCurrentPosition(),
		};
	}

}, initialState);

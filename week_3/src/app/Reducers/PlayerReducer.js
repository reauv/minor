import { createReducer } from 'redux-act';
import * as actions from 'Actions/PlayerActions';

const initialState = {
	duration: 0,
	position: 0,
	player: null,
	playing: false,
	currentTrack: null,
}

export default createReducer({
	[actions.playTrack]: (state, track) => {
		return {...state,
			currentTrack: track,
			playing: true
		};
	},

	[actions.pauseTrack]: (state) => {
		return {...state,
			playing: false,
		};
	},

	[actions.durationChanged]: (state, duration) => {
		return {...state,
			duration: duration,
		}
	},

	[actions.timeChanged]: (state, time) => {
		return {...state,
			position: time,
		}
	}

}, initialState);

import { createReducer } from 'redux-act';
import * as actions from 'Actions/UserActions';

const initialState = {
	token: localStorage.getItem('token'),
	authenticating: 'idle'
}

export default createReducer({
	[actions.authenticating]: (state) => {
		return {
			...state,
			authenticating: 'loading',
		}
	},

	[actions.authenticated]: (state, payload) => {
		return {
			...state,
			token: payload.oauth_token,
			authenticating: 'done',
		}
	},

}, initialState);


import { createReducer } from 'redux-act';
import * as actions from 'Actions/UserActions';

const initialState = {
	user: null,
	authenticating: 'idle'
}

export default createReducer({
}, initialState);


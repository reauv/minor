import Soundcloud from 'soundcloud';
import * as actions from 'Actions/UserActions';

export function authenticate() {
	actions.authenticating();

	Soundcloud.connect()
		.then((data) => {
			actions.authenticated(data);
			localStorage.setItem('token', data.oauth_token);
		})
		.catch(error => console.error(error));
}



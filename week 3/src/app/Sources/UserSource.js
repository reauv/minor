import Soundcloud from 'soundcloud';
import * as actions from 'Actions/UserActions';
import { fetchActivities } from 'Sources/SoundcloudSource';

export function authenticate() {
	actions.authenticating();

	Soundcloud.connect()
		.then(() => fetchActivities())
		.catch(error => console.error(error));
}



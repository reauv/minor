import Soundcloud from 'soundcloud';
import * as actions from 'Actions/SoundcloudActions';

export function fetchTracks() {
	actions.fetchingTracks();

	return Soundcloud.get('/tracks')
		.then(response => actions.fetchedTracks(response))
		.catch(error => console.error(error));
}

export function streamTrack(track) {
	actions.streamingTrack();

	return Soundcloud.stream(`tracks/${track}`)
		.then(player => actions.streamedTrack(player));
}

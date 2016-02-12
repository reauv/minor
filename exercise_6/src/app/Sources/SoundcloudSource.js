import Soundcloud from 'soundcloud';
import * as actions from 'Actions/SoundcloudActions';

export function fetchTracks() {
	actions.fetchingTracks();

	return Soundcloud.get('/tracks?filter.genre_or_tag=dance')
		.then(response => actions.fetchedTracks(response))
		.catch(error => console.error(error));
}

export function fetchTrack(id) {
	actions.fetchingTrack();

	return Soundcloud.get(`/tracks/${id}`)
		.then(response => actions.fetchedTrack(response))
		.catch(error => console.error(error));
}

export function streamTrack(track) {
	actions.streamingTrack();

	return Soundcloud.stream(`tracks/${track}`)
		.then(player => actions.streamedTrack(player));
}

export function fetchActivities() {
	actions.fetchingTracks();

	Soundcloud.get('/me/activities/tracks/affiliated')
		.then(response => actions.fetchedTracks(response.collection))
		.catch(error => console.error(error));
}

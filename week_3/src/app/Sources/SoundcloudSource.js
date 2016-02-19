import _ from 'lodash';
import Soundcloud from 'soundcloud';
import * as playerActions from 'Actions/PlayerActions';
import * as soundcloudActions from 'Actions/SoundcloudActions';

export function fetchTracks() {
	soundcloudActions.fetchingTracks();

	return Soundcloud.get('/tracks?filter.genre_or_tag=dance')
		.then(response => soundcloudActions.fetchedTracks(response))
		.catch(error => console.error(error));
}

export function fetchTrack(id) {
	soundcloudActions.fetchingTrack();

	return Soundcloud.get(`/tracks/${id}`)
		.then(response => soundcloudActions.fetchedTrack(response))
		.catch(error => _.defer(() => { throw error }));
}

export function streamTrack(track, streamOptions) {
	playerActions.streamingTrack();

	console.log(streamOptions);
	debugger;

	return Soundcloud.stream(`tracks/${track}`, streamOptions)
		.then(player => playerActions.streamedTrack(player));
}

export function fetchFeed() {
	soundcloudActions.fetchingTracks();

	Soundcloud.get('/me/activities/tracks/affiliated')
		.then(response => soundcloudActions.fetchedTracks(response.collection))
		.catch(error => console.error(error));
}

export function fetchSamples(track) {
	const url = track.waveform_url.replace('png', 'json');
	fetch(url)
		.then(response => response.json())
		.then(data => soundcloudActions.fetchedSamples({ trackId: track.id, samples: data.samples }));
}

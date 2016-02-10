import { createAction } from 'redux-act';

export const fetchingTracks = createAction('Tracks are being fetched.');
export const fetchedTracks = createAction('Tracks are successfully fetched.');
export const fetchingTracksFailed = createAction('Failed to fetch tracks');
export function fetchTracks() {
	fetchingTracks();

	return fetch(`https://www.reddit.com/r/test.json`)
		.then(response => response.json())
		.then(json => fetchedTracks(json))
		.catch(error => fetchingTracksFailed(error));
}

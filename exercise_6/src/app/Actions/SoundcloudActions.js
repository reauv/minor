import { createAction } from 'redux-act';

export const fetchingTracks = createAction('Tracks are being fetched.');
export const fetchedTracks = createAction('Tracks are successfully fetched.');
export const fetchingTracksFailed = createAction('Failed to fetch tracks');

export const streamingTrack = createAction('Track is being streamed');
export const streamedTrack = createAction('Track is successfully streamed');
export const streamingTrackFailed = createAction('Failed to stream track');

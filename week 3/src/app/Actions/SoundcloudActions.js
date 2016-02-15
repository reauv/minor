import { createAction } from 'redux-act';

export const fetchingTracks = createAction('Tracks are being fetched.');
export const fetchedTracks = createAction('Tracks are successfully fetched.');
export const fetchingTracksFailed = createAction('Failed to fetch tracks');

export const fetchingTrack = createAction('Track is being fetched.');
export const fetchedTrack = createAction('Track is successfully fetched.');
export const fetchingTrackFailed = createAction('Failed to fetch track');

export const streamingTrack = createAction('Track is being streamed');
export const streamedTrack = createAction('Track is successfully streamed');
export const streamingTrackFailed = createAction('Failed to stream track');

export const playTrack = createAction('Play a track');
export const pauseTrack = createAction('Pause a track');

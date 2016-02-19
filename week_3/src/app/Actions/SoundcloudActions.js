import { createAction } from 'redux-act';

export const fetchingTracks = createAction('Tracks are being fetched.');
export const fetchedTracks = createAction('Tracks are successfully fetched.');
export const fetchingTracksFailed = createAction('Failed to fetch tracks');

export const fetchingTrack = createAction('Track is being fetched.');
export const fetchedTrack = createAction('Track is successfully fetched.');
export const fetchingTrackFailed = createAction('Failed to fetch track');

export const fetchedSamples = createAction('Samples successfully fetched.');

import { createAction } from 'redux-act';

export const streamingTrack = createAction('Track is being streamed');
export const streamingTrackFailed = createAction('Failed to stream track');
export const streamedTrack = createAction('Track is successfully streamed');

export const timeChanged = createAction('Time position of track is changed.');

export const playTrack = createAction('Play a track');
export const pauseTrack = createAction('Pause a track');

import { createAction } from 'redux-act';

export const authenticating = createAction('Authenticating with Soundcloud');
export const authenticatingSuccess = createAction('Successfully authenticated with Soundcloud');
export const authenticatingFailure = createAction('Failed to authenticate with Soundcloud');

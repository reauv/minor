import React from 'react';
import { authenticate } from 'Sources/UserSource';

const Auth = () =>
	<button onClick={authenticate}>
		Connect with Soundcloud
	</button>;

export default Auth;

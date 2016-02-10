import React from 'react';

const Track = ({ track, onClick }) =>
	<div onClick={onClick}>
		<h4>{track.title}</h4>
	</div>;

export default Track;

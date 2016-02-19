import React from 'react';
import TrackCompact from 'Components/TrackCompact/TrackCompact';

const Feed = (props) =>
	<div>
		{props.tracks.map((item, i) =>
			<TrackCompact
				key={i}
				{...props}
				track={item.origin}
				samples={props.samples.find(samples => {
					return samples.trackId === item.origin.id;
				})}
			/>
		)}
	</div>;

export default Feed;

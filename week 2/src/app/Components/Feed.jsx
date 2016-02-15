import React from 'react';
import Track from 'Components/Track/Track';

const Feed = ({ collection, playing, currentTrack }) =>
	<div>
		{collection.map(item =>
			<Track
				playing={playing}
				track={item.origin}
				key={item.origin.id}
				currentTrack={currentTrack}
			/>
		)}
	</div>;

export default Feed;

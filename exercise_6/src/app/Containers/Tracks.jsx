import Track from 'Components/Track';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { fetchTracks, streamTrack } from 'Sources/SoundcloudSource';

class Tracks extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		status: PropTypes.string,
		tracks: PropTypes.array,
	};

	/**
	 * Invoked once, both on the client and server, immediately
	 * before the initial rendering occurs.
	 *
	 * @return {void}
	 */
	componentWillMount() {
		fetchTracks();
	}

	onTrackClick(track) {
		streamTrack(track.id);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div>
				<h2>Tracks</h2>
				<p>{this.props.status}</p>

				{this.props.tracks.map(track =>
					<Track
						track={track}
						key={track.id}
						onClick={this.onTrackClick.bind(this, track)}
					/>
				)}

			</div>
		);
	}
}

function select(state) {
	return {
		status: state.soundcloud.fetchingTracks,
		tracks: state.soundcloud.tracks,
	}
}

export default connect(select)(Tracks);

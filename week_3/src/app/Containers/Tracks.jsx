import Feed from 'Components/Feed';
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
	componentWillMount() {}

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
				<Feed
					playing={this.props.playing}
					collection={this.props.tracks}
					currentTrack={this.props.currentTrack}
				/>
			</div>
		);
	}
}

function select(state) {
	return {
		tracks: state.soundcloud.tracks,
		playing: state.player.playing,
		currentTrack: state.player.currentTrack,
		status: state.soundcloud.fetchingTracks,
	}
}

export default connect(select)(Tracks);

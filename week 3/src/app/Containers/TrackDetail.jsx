import { connect } from 'react-redux';
import Track from 'Components/Track/Track';
import React, { Component, PropTypes } from 'react';
import { fetchTrack } from 'Sources/SoundcloudSource';

class TrackDetail extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		playing: PropTypes.bool,
		track: PropTypes.object,
		params: PropTypes.object,
		currentTrack: PropTypes.number,
		fetchingTrack: PropTypes.string,
	};

	/**
	 * Invoked once, both on the client and server, immediately
	 * before the initial rendering occurs.
	 *
	 * @return {void}
	 */
	componentWillMount() {
		const id = this.props.params.id;
		fetchTrack(id);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		if (this.props.fetchingTrack !== 'done') {
			return <div>Loading...</div>
		}

		return (
			<Track
				track={this.props.track}
				player={this.props.player}
				playing={this.props.playing}
				position={this.props.position}
				currentTrack={this.props.currentTrack}
			/>
		);
	}
}

function select(state) {
	return {
		track: state.soundcloud.track,
		playing: state.player.playing,
		position: state.player.position,
		currentTrack: state.player.currentTrack,
		fetchingTrack: state.soundcloud.fetchingTrack,
	}
}

export default connect(select)(TrackDetail);

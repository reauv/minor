import { connect } from 'react-redux';
import Track from 'Components/Track/Track';
import React, { Component, PropTypes } from 'react';
import { fetchTrack } from 'Sources/SoundcloudSource';

class TrackDetailContainer extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		playing: PropTypes.bool,
		track: PropTypes.object,
		params: PropTypes.object,
		samples: PropTypes.object,
		currentTrack: PropTypes.object,
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
	 * Invoked when a component is receiving new props.
	 * This method is not called for the initial render.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if(nextProps.params.id !== this.props.params.id) {
			fetchTrack(nextProps.params.id);
		}
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
			<Track {...this.props} />
		);
	}
}

function select(state, props) {
	const id = props.params.id;
	const samples = state.soundcloud.samples.find(i => i.trackId === parseInt(id));

	return {
		samples: samples,
		track: state.soundcloud.track,
		playing: state.player.playing,
		position: state.player.position,
		duration: state.player.duration,
		currentTrack: state.player.currentTrack,
		fetchingTrack: state.soundcloud.fetchingTrack,
	}
}

export default connect(select)(TrackDetailContainer);

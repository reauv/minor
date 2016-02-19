import Auth from 'Components/Auth';
import { connect } from 'react-redux';
import Feed from 'Components/Feed/Feed';
import { routeActions } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { fetchFeed } from 'Sources/SoundcloudSource';

class FeedContainer extends Component {

	/**
	 * Invoked once, both on the client and server, immediately
	 * before the initial rendering occurs.
	 *
	 * @return {void}
	 */
	componentWillMount() {
		fetchFeed();
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return <Feed {...this.props} />
	}
}

function select(state) {
	return {
		token: state.user.token,
		playing: state.player.playing,
		position: state.player.position,
		duration: state.player.duration,
		tracks: state.soundcloud.tracks,
		samples: state.soundcloud.samples,
		currentTrack: state.player.currentTrack,
		status: state.soundcloud.fetchingTracks,
	}
}

export default connect(select)(FeedContainer);

import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import React, { Component, PropTypes } from 'react';
import { fetchTracks } from 'Actions/SoundcloudActions';

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

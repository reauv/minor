import { connect } from 'react-redux';
import Player from 'Components/Player/Player';
import React, { Component, PropTypes } from 'react';

class PlayerContainer extends Component {

	/**
	 * Construct the component.
	 *
	 * @param  {Object} props   - The properties of the component.
	 * @param  {Object} context - The context of the component.
	 * @constructor
	 */
	constructor(props, context) {
		super(props, context);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		if (this.props.currentTrack) {
			return <Player {...this.props} />
		}

		return <div />
	}
}

function select(state) {
	return {
		clientId: state.soundcloud.key,
		tracks: state.soundcloud.tracks,
		...state.player,
	}
}

export default connect(select)(PlayerContainer);

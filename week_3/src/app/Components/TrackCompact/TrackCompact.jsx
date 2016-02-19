import _ from 'lodash';
import { Link } from 'react-router';
import style from './track_compact.css';
import React, { Component, PropTypes } from 'react';
import Waveform from 'Components/Waveform/Waveform';
import { streamTrack } from 'Sources/SoundcloudSource';
import { playTrack, pauseTrack } from 'Actions/PlayerActions';

class TrackCompact extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		samples: PropTypes.object,
		position: PropTypes.number,
		duration: PropTypes.number,
		currentTrack: PropTypes.object,
		playing: PropTypes.bool.isRequired,
		track: PropTypes.object.isRequired,
	};

	/**
	 * Check if this track is the current played track.
	 *
	 * @return {Boolean}
	 */
	isCurrentTrack() {
		return this.props.currentTrack.id === this.props.track.id;
	}

	/**
	 * Check if this track is playing.
	 *
	 * @return {Boolean}
	 */
	isPlaying() {
		return this.props.playing && this.isCurrentTrack();
	}

	/**
	 * Invoked when the play button is clicked.
	 *
	 * @return {void}
	 */
	onPlayClick() {
		if (this.isPlaying()) {
			return pauseTrack();
		}

		return playTrack(this.props.track);
	}

	/**
	 * Render the play button.
	 * @return {ReactElement}
	 */
	renderPlayButton() {
		const icon = (this.isPlaying()) ? 'fa fa-pause' : 'fa fa-play';

		return (
			<div className={style.play} onClick={this.onPlayClick.bind(this)}>
				<i className={icon} />
			</div>
		);
	}

	/**
	 * Render the component.

	 * @return {ReactElement}
	 */
	render() {
		const track = this.props.track;

		return (
			<div className={style.container}>
				<div className={style.cover}>
					<img src={track.artwork_url || track.user.avatar_url} />
				</div>

				<div className={style.main}>
					{/* Meta */}
					<div className={style.meta}>
						{this.renderPlayButton()}
						<div className={style.header}>
							<h5 className={style.user}>{track.user.username}</h5>
							<Link to={`/track/${track.id}`} className={style.title}>
								{track.title}
							</Link>
						</div>
					</div>

					{/* Waveform */}
					<div className={style.waveform}>
						<Waveform {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}

export default TrackCompact;

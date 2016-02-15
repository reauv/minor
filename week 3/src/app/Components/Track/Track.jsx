import style from './track.css';
import Waveform from 'waveform.js';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { streamTrack } from 'Sources/SoundcloudSource';
import { playTrack, pauseTrack } from 'Actions/PlayerActions';

class Track extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		position: PropTypes.number,
		currentTrack: PropTypes.number,
		playing: PropTypes.bool.isRequired,
		track: PropTypes.object.isRequired,
	};

	/**
	 * Invoked once, only on the client (not on the server), immediately
	 * after the initial rendering occurs.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		this.waveform = new Waveform({
			container: this.refs.waveform,
			outerColor: '#FFF',
			innerColor: '#BBB',
		});

		this.waveform.dataFromSoundCloudTrack(this.props.track);
	}

	/**
	 * Check if this track is playing.
	 *
	 * @return {Boolean}
	 */
	isPlaying() {
		return this.props.playing && this.props.currentTrack === this.props.track.id;
	}

	/**
	 * Invoked when the play button is clicked.
	 *
	 * @return {void}
	 */
	onPlayClick() {
		if (this.props.currentTrack !== this.props.track.id) {
			return streamTrack(this.props.track.id, this.waveform.optionsForSyncedStream());
		}

		if (this.props.playing) {
			return pauseTrack();
		}

		return playTrack();
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
	 * Render the fill for the wave form depending on the play position.
	 *
	 * @return {ReactElement|null}
	 */
	renderWaveformFill() {
		let length;

		if (!this.isPlaying()) {
			return null;
		}

		length = Math.ceil((this.props.position / this.props.track.duration) * 100);

		return (
			<div className={style.waveform_fill} style={{width: length}} />
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
					<div className={style.meta}>
						{this.renderPlayButton()}
						<div className={style.header}>
							<h5 className={style.user}>{track.user.username}</h5>
							<Link to={`/track/${track.id}`} className={style.title}>
								{track.title}
							</Link>
						</div>
					</div>
					<div ref="waveform" className={style.waveform}>
					</div>
				</div>

			</div>
		);
	}
}

export default Track;

import _ from 'lodash';
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
		duration: PropTypes.number,
		currentTrack: PropTypes.object,
		playing: PropTypes.bool.isRequired,
		track: PropTypes.object.isRequired,
	};

	/**
	 * Throttle the waveform redraw.

	 * Because the waveform redraw method will only be available after the
	 * waveform is set this is just an initial empty function until there is
	 * something to throttle.
	 *
	 * @type {Function}
	 */
	redrawWaveform = () => {};

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
			innerColor: (x) => {
				if (x < this.props.position / this.props.duration) {
					return '#f50';
				}

				return '#BBB';
			},
		});

		this.waveform.dataFromSoundCloudTrack(this.props.track);
		this.redrawWaveform = _.throttle(this.waveform.redraw, 100);
	}

	/**
	 * Invoked when a component is receiving new props.
	 * This method is not called for the initial render.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		const positionChanged = nextProps.position !== this.props.position;
		const durationChanged = nextProps.duration !== this.props.duration;

		if (positionChanged || durationChanged) {
			this.redrawWaveform();
		}
	}

	/**
	 * Check if this track is playing.
	 *
	 * @return {Boolean}
	 */
	isPlaying() {
		return this.props.playing && this.props.currentTrack.id === this.props.track.id;
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

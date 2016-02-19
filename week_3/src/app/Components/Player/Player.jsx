import style from './player.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from 'Actions/PlayerActions';

class Player extends Component {

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
	 * Invoked once, only on the client (not on the server), immediately
	 * after the initial rendering occurs.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		this.refs.audio.addEventListener('timeupdate', e => actions.timeChanged(e.target.currentTime));
		this.refs.audio.addEventListener('durationchange', e => actions.durationChanged(e.target.duration));
	}

	/**
	 * Invoked immediately after the component's updates are flushed to the DOM.
	 * This method is not called for the initial render.
	 *
	 * @return {void}
	 */
	componentDidUpdate() {
		if (this.props.playing) {
			this.refs.audio.play();
		} else {
			this.refs.audio.pause();
		}
	}

	/**
	 * Get the source of the current track.
	 *
	 * @return {String}
	 */
	getSource() {
		if (!this.props.currentTrack) {
			return null;
		}

		return `https://api.soundcloud.com/tracks/${this.props.currentTrack.id}/stream?client_id=${this.props.clientId}`;
	}

	/**
	 * Get the index of the current track in the tracklist.
	 *
	 * @return {Integer}
	 */
	getCurrentTrackIndex() {
		const currentTrackId = this.props.currentTrack.id;
		return this.props.tracks.findIndex((e) => {
			return e.origin.id === currentTrackId
		});
	}

	/**
	 * Invoked when the play button is clicked.
	 *
	 * @return {void}
	 */
	onPlayClick() {
		this.props.playing ? actions.pauseTrack() : actions.playTrack(this.props.currentTrack);
	}

	/**
	 * Invoked when the next button is clicked.
	 *
	 * @return {void}
	 */
	onNextClick() {
		const nextTrack = this.props.tracks[this.getCurrentTrackIndex() + 1].origin;

		actions.nextTrack(nextTrack);
	}

	/**
	 * Invoked when the next button is clicked.
	 *
	 * @return {void}
	 */
	onPreviousClick() {
		const previousTrack = this.props.tracks[this.getCurrentTrackIndex() - 1].origin;

		actions.previousTrack(previousTrack);
	}

	/**
	 * Render the play button.
	 *
	 * @return {ReactElement}
	 */
	renderPlayButton() {
		const icon = this.props.playing ? 'fa fa-pause' : 'fa fa-play';

		return (
			<button className={style.play} onClick={this.onPlayClick.bind(this)}>
				<i className={icon} />
			</button>
		);
	}

	/**
	 * Render the previous button.
	 *
	 * @return {ReactElement}
	 */
	renderPreviousButton() {
		const disabled = (this.getCurrentTrackIndex() < 1);

		return (
			<button className={style.previous} disabled={disabled} onClick={this.onPreviousClick.bind(this)}>
				<i className='fa fa-step-backward' />
			</button>
		);
	}

	/**
	 * Render the next button.
	 *
	 * @return {ReactElement}
	 */
	renderNextButton() {
		const disabled = (this.getCurrentTrackIndex() >= this.props.tracks.length - 1);

		return (
			<button className={style.next} disabled={disabled} onClick={this.onNextClick.bind(this)}>
				<i className='fa fa-step-forward' />
			</button>
		);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		const track = this.props.currentTrack;

		return (
			<div className={style.container}>
				<audio ref="audio" src={this.getSource()} autoPlay={this.props.playing}/>

				<div className={style.wrapper}>
					<div className={style.track}>
						<div className={style.cover}>
							<img src={track.artwork_url || track.user.avatar_url} />
						</div>
						<div className={style.track_meta}>
							<div className={style.artist}>
								{track.user.username}
							</div>
							<div className={style.track_title}>
								{track.title}
							</div>
						</div>
					</div>

					{this.renderPreviousButton()}
					{this.renderPlayButton()}
					{this.renderNextButton()}
				</div>

			</div>
		);
	}
}

export default Player;

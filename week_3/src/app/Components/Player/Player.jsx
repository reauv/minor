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
	 * Invoked when the play button is clicked.
	 *
	 * @return {void}
	 */
	onPlayClick() {
		this.props.playing ? actions.pauseTrack() : actions.playTrack(this.props.currentTrack);
	}

	/**
	 * Render the play button.
	 *
	 * @return {ReactElement}
	 */
	renderPlayButton() {
		const icon = this.props.playing ? 'fa fa-pause' : 'fa fa-play';

		return (
			<div className={style.play} onClick={this.onPlayClick.bind(this)}>
				<i className={icon} />
			</div>
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

					{this.renderPlayButton()}
				</div>

			</div>
		);
	}
}

export default Player;

import style from './track.css';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';
import { streamTrack } from 'Sources/SoundcloudSource';
import { playTrack, pauseTrack } from 'Actions/SoundcloudActions';

class Track extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		currentTrack: PropTypes.number,
		playing: PropTypes.bool.isRequired,
		track: PropTypes.object.isRequired,
	};

	/**
	 * Invoked when the play button is clicked.
	 *
	 * @return {void}
	 */
	onPlayClick() {
		if (this.props.currentTrack !== this.props.track.id) {
			return streamTrack(this.props.track.id);
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
		const icon = (this.props.playing && this.props.currentTrack == this.props.track.id)
			? 'fa fa-pause' : 'fa fa-play';

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
				<img className={style.cover} src={track.artwork_url || track.user.avatar_url} />
				<div className={style.meta}>
					{this.renderPlayButton()}
					<div className={style.header}>
						<h5 className={style.user}>{track.user.username}</h5>
						<Link to={`/track/${track.id}`} className={style.title}>
							{track.title}
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Track;

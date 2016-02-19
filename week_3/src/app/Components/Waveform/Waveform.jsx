import style from './waveform.css';
import WaveformJS from 'waveform.js';
import React, { Component, PropTypes } from 'react';
import { fetchSamples } from 'Sources/SoundcloudSource';

class Waveform extends Component {

	/**
	 * Validates the props used by the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		track: PropTypes.object,
		samples: PropTypes.object,
		position: PropTypes.number,
		duration: PropTypes.number,
	}

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
	 * Invoked once, both on the client and server, immediately
	 * before the initial rendering occurs.
	 *
	 * @return {void}
	 */
	componentWillMount() {
		if (!this.props.samples && this.props.track.waveform_url) {
			fetchSamples(this.props.track);
		}
	}

	/**
	 * Invoked once, only on the client (not on the server), immediately
	 * after the initial rendering occurs.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		if (this.props.samples) {
			this.drawWaveform(this.props.samples.data);
		}
	}

	/**
	 * Check if this track is the current played track.
	 *
	 * @return {Boolean}
	 */
	isCurrentTrack() {
		return this.props.currentTrack.id === this.props.track.id;
	}

	/**
	 * Draw the waveform.
	 *
	 * @param  {Array} data
	 * @return {void}
	 */
	drawWaveform(data) {
		const samples = _.chunk(data, 4)
			.map(c => c.map((c, i, a) => _.mean(a)))
			.map(c => c.map((d, i, a) => (i > a.length - 3) ? 0 : d))
			.reduce((a, b) => a.concat(b), [])
			.map(d => d / _.max(data));

		this.waveform = new WaveformJS({
			width: 600,
			height: 100,
			data: samples,
			interpolate: false,
			container: this.refs.waveform,
			outerColor: '#FFF',
			innerColor: (x) => {
				if (x < this.props.position / this.props.duration) {
					return '#F50';
				}
				if (x === this.props.position / this.props.duration) {
					return '#AD3A00';
				}
				return '#BBB';
			},
		});

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

		if ((positionChanged || durationChanged) && this.isCurrentTrack()) {
			this.redrawWaveform();
		}

		if (!this.waveform && nextProps.samples) {
			this.drawWaveform(nextProps.samples.data);
		}
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div ref="waveform" className={style.waveform}></div>
		);
	}
}

export default Waveform;

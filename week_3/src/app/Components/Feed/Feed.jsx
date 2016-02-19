import style from './feed.css';
import React, { Component } from 'react';
import PullToRefresh from 'react-pull-to-refresh';
import { fetchFeed } from 'Sources/SoundcloudSource';
import TrackCompact from 'Components/TrackCompact/TrackCompact';

class Feed extends Component {

	resolve = null;

	/**
	 * Invoked when a component is receiving new props.
	 * This method is not called for the initial render.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (this.resolve && nextProps.status === 'done') {
			this.resolve();
			this.resolve = null;
		}
	}

	handleRefresh(resolve) {
		fetchFeed();
		this.resolve = resolve;
	}

	renderFeed() {
		if (this.props.status === 'done') {
			return this.props.tracks.map((item, i) =>
				<TrackCompact
					key={i}
					{...this.props}
					track={item.origin}
					samples={this.props.samples.find(samples => {
						return samples.trackId === item.origin.id;
					})}
				/>
			);
		}

		return (
			<div className={style.loading}>
				<i className="fa fa-spinner fa-pulse"></i>
			</div>
		);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<PullToRefresh
				className={style.refresh}
				onRefresh={this.handleRefresh.bind(this)}
				icon={<span className={style.refresh_info}>Pull to refresh</span>}
				loading={<span></span>}
			>
				{this.renderFeed()}
			</PullToRefresh>
		);
	}
}

export default Feed;


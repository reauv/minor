import style from './feed.css';
import React, { Component } from 'react';
import PullToRefresh from 'react-pull-to-refresh';
import TrackCompact from 'Components/TrackCompact/TrackCompact';

class Feed extends Component {

	handleRefresh(resolve) {
		setTimeout(() => resolve(), 2000);
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
				onRefresh={this.handleRefresh}
				icon={<span className={style.refresh_info}>Pull to refresh</span>}
				loading={<span className={style.refresh_loading}><i className="fa fa-spinner fa-pulse"></i></span>}
			>
				{this.props.tracks.map((item, i) =>
					<TrackCompact
						key={i}
						{...this.props}
						track={item.origin}
						samples={this.props.samples.find(samples => {
							return samples.trackId === item.origin.id;
						})}
					/>
				)}
			</PullToRefresh>
		);
	}
}

export default Feed;


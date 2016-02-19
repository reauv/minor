import Auth from 'Components/Auth';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

class AuthContainer extends Component {

	/**
	 * Validates the context used by the component.
	 *
	 * @type {Object}
	 */
	static contextTypes = {
		router: PropTypes.object,
	}

	/**
	 * Invoked when a component is receiving new props.
	 * This method is not called for the initial render.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.token) {
			this.context.router.push('/');
		}
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return <Auth />
	}
}

function select(state) {
	return {token: state.user.token}
}

export default connect(select)(AuthContainer);

/**
 * Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
 * MIT License
 */
const eventTarget = function eventTarget() {
	this._listeners = {};
};

EventTarget.prototype = {

	constructor: EventTarget,

	addListener(type, listener) {
		if (typeof this._listeners[type] === 'undefined') {
			this._listeners[type] = [];
		}

		this._listeners[type].push(listener);
	},

	fire(event) {
		let ev = event;

		if (typeof ev === 'string') {
			ev = { type: event };
		}
		if (!event.target) {
			ev.target = this;
		}

		if (!event.type) {
			throw new Error(`Event object missing 'type' property.`);
		}

		if (this._listeners[event.type] instanceof Array) {
			const listeners = this._listeners[event.type];
			listeners.forEach(listener => {
				listener.call(this, event);
			});
		}
	},

	removeListener(type, listener) {
		const listeners = this._listeners[type];

		if (this._listeners[type] instanceof Array) {
			listeners.forEach((l, i) => {
				if (l === listener) {
					listeners.splice(i, 1);
				}
			});
		}
	},
};

export default eventTarget;

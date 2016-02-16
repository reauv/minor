var config, counter, encode, head, jsonp, key, load, query, setDefaults;
load = function(url) {
	var done, head, script;
	script = document.createElement("script");
	done = false;
	script.src = url;
	script.async = true;
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
			done = true;
			script.onload = script.onreadystatechange = null;
			if (script && script.parentNode) {
				return script.parentNode.removeChild(script);
			}
		}
	};
	if (!head) {
		head = document.getElementsByTagName("head")[0];
	}
	return head.appendChild(script);
};
encode = function(str) {
	return encodeURIComponent(str);
};
jsonp = function(url, params, callback, callbackName) {
	var key, query, uniqueName;
	query = ((url || "").indexOf("?") === -1 ? "?" : "&");
	callbackName = callbackName || config["callbackName"] || "callback";
	uniqueName = callbackName + "_json" + (++counter);
	params = params || {};
	for (key in params) {
		if (params.hasOwnProperty(key)) {
			query += encode(key) + "=" + encode(params[key]) + "&";
		}
	}
	window[uniqueName] = function(data) {
		callback(data);
		try {
			delete window[uniqueName];
		} catch (_error) {}
		return window[uniqueName] = null;
	};
	load(url + query + callbackName + "=" + uniqueName);
	return uniqueName;
};
setDefaults = function(obj) {
	var config;
	return config = obj;
};
counter = 0;
head = void 0;
query = void 0;
key = void 0;
window = this;
config = {};

export default {
	get: jsonp,
	init: setDefaults
};

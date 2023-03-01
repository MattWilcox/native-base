export default class FetchWrapper {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	get(endpoint) {
		return fetch(this.baseURL + endpoint)
			.then(response => response.json());
	}

	getHtml(endpoint) {
		return fetch(this.baseURL + endpoint)
			.then(response => response.text());
	}

	put(endpoint, body) {
		return this._send("put", endpoint, body);
	}

	post(endpoint, body) {
		return this._send("post", endpoint, body);
	}

	delete(endpoint, body) {
		return this._send("delete", endpoint, body);
	}

	_send(method, endpoint, body) {
		return fetch(this.baseURL + endpoint, {
			method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}).then(response => response.json());
	}
}

// Use:
//
// import FetchWrapper from './fetch-wrapper.js';
// const API = new FetchWrapper('https://baseUrlHere');
// API.get( endpoint );
// API.put( endpoint, { key: value });
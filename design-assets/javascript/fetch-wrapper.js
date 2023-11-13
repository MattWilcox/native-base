/**
 * A helper to make working with standard JS Fetch a little simpler.
 * @module fetch-wrapper
 */
export default class FetchWrapper {
	/**
	 * @param {URL} baseUrl - baseUrl is the "root" URL for whichever API you're using
	 */
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	/**
	 * Issue a GET request on the provided endpoint, expects a JSON response.
	 * @param {*} endpoint
	 * @returns {JSON}
	 */
	get(endpoint) {
		return fetch(this.baseURL + endpoint)
			.then(response => response.json());
	}

	/**
	 * Issue a GET request on the provided endpoint, returns the raw text.
	 * @param {*} endpoint
	 * @returns {text}
	 */
	getHtml(endpoint) {
		return fetch(this.baseURL + endpoint)
			.then(response => response.text());
	}

	/**
	 * Issue a PUT request to the endpoint
	 * @param {*} endpoint - The API endpoint to PUT to
	 * @param {*} body - The information being sent
	 * @returns {string} - HTTP status code
	 */
	put(endpoint, body) {
		return this.#send("put", endpoint, body);
	}

	/**
	 * Issue a POST request to the endpoint
	 * @param {*} endpoint - The API endpoint to PUT to
	 * @param {*} body - The information being sent
	 * @returns {string} - HTTP status code
	 */
	post(endpoint, body) {
		return this.#send("post", endpoint, body);
	}

	/**
	 * Issue a DELETE request to the endpoint
	 * @param {*} endpoint - The API endpoint to PUT to
	 * @param {*} body - The information being sent
	 * @returns {string} - HTTP status code
	 */
	delete(endpoint, body) {
		return this.#send("delete", endpoint, body);
	}

	#send(method, endpoint, body) {
		return fetch(this.baseURL + endpoint, {
			method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}).then(
			response => response.json()
		);
	}
}

// Use:
//
// import FetchWrapper from './fetch-wrapper.js';
// const API = new FetchWrapper('https://baseUrlHere');
// API.get( endpoint );
// API.put( endpoint, { key: value });

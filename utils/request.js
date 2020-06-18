import Axios from 'axios';
import Constants from 'expo-constants';
import Sentry from '../services/sentry';
import login from '../services/login';
import API from '../config/api';

// middleware that add the token if it exist
Axios.interceptors.request.use(async (config) => {
	const newConfig = config;
	const token = await login.getToken();

	// add cache buster
	const cacheBuster = Math.round(Math.random() * 100000);
	if (newConfig.params) {
		newConfig.params.cache = cacheBuster;
	} else {
		newConfig.params = { cache: cacheBuster };
	}

	if (token != null) {
		let rightToken = token;
		const isTokenExpired = await login.isTokenExpired();
		if (isTokenExpired) {
			const { personId } = await login.getUser();
			const refreshToken = await login.getRefreshToken();

			const headers = new Headers();
			headers.append('Authorization', `Bearer ${refreshToken}`);
			headers.append(
				'User-Agent',
				`${await Constants.getWebViewUserAgentAsync()} mg2app${Constants.manifest.name}`,
			);
			headers.append('Content-Type', 'application/x-www-form-urlencoded');

			const url = `${API()}/action/generateNewTokens?personId=${personId}`;
			const options = {
				headers,
				method: 'GET',
			};

			try {
				const res = await fetch(url, options);

				if (res.ok) {
					const { tokens } = await res.json();
					await login.setToken(tokens.access);
					await login.setRefreshToken(tokens.refresh);
					rightToken = tokens.access;
				} else {
					login.logout();
				}
			} catch (error) {
				Sentry.captureException(error);
			}
		}
		newConfig.headers.Authorization = `Bearer ${rightToken}`;
	}

	newConfig.headers['User-Agent'] = `${await Constants.getWebViewUserAgentAsync()} mg2app${Constants.manifest.name}`;
	newConfig.headers['Cache-Control'] = 'no-cache';

	return newConfig;
}, (err) => {
	Sentry.captureException(err);
	Promise.reject(err);
});

/**
   * Checks if a network request came back fine, and throws an error if not
   *
   * @param  {object} response   A response from a network request
   *
   * @return {object|undefined} Returns either the response, or throws an error
   */
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	if (response.status === 401) {
		login.logout();
	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

/**
   * Requests a URL, returning a promise
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   *
   * @return {object}           The response data
   */
function request(options) {
	return Axios(options)
		.then(checkStatus)
		.catch(({ response }) => checkStatus(response));
}

export default request;

import jwtDecode from 'jwt-decode';
import { Updates } from 'expo';
import moment from 'moment';
import Axios from 'axios';
import * as Sentry from '@sentry/browser';
import he from 'he';
import MyStorage from '../../constants/myStorage';
import store from '../../store';
import API from '../../config/api';

async function purgePersitor() {
	try {
		localStorage.clear();
	} catch (error) {
		Sentry.captureException(error);
	}
	await store.persistor.purge();
	Updates.reloadFromCache();
}

function setToken(token) {
	try {
		localStorage.setItem(MyStorage.TOKEN, token);
	} catch (error) {
		Sentry.captureException(error);
	}
}

function getToken() {
	try {
		const token = localStorage.getItem(MyStorage.TOKEN);
		return token;
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

function getRefreshToken() {
	try {
		const token = localStorage.getItem(MyStorage.REFRESH);
		return token;
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

function setRefreshToken(token) {
	try {
		localStorage.setItem(MyStorage.REFRESH, token);
	} catch (error) {
		Sentry.captureException(error);
	}
}

function purgeTokens() {
	try {
		localStorage.removeItem(MyStorage.TOKEN);
		localStorage.removeItem(MyStorage.REFRESH);
	} catch (error) {
		Sentry.captureException(error);
	}
}

async function logout() {
	const token = await getToken();
	const refresh = await getRefreshToken();
	if (token) {
		const url = `${API()}/action/logout`;
		const options = {
			url,
			params: {
				ajax: true,
				token: refresh,
			},
		};
		Axios(options);
	}
	await purgeTokens();
	purgePersitor();
}

async function isTokenExpired() {
	try {
		const token = await getToken();
		const { exp } = jwtDecode(token);

		return exp * 1000 < +moment();
	} catch (error) {
		Sentry.captureException(error);
		return true;
	}
}

async function checkToken() {
	try {
		const token = await getToken();
		if (token) {
			if (await isTokenExpired()) {
				logout();
			}
		} else {
			logout();
		}
	} catch (error) {
		Sentry.captureException(error);
	}
}

function setUser(user) {
	Sentry.setUser({
		email: user.email,
		id: user.id,
		username: he.decode(`${user.firstName} ${user.lastName}`),
		role: user.addInfo1,
		termsAndConditions: user.addInfo2,
		locations: user.addInfo4,
		personIdOfCreator: user.addInfo6,
	});

	try {
		localStorage.setItem(MyStorage.USER, JSON.stringify(user));
	} catch (error) {
		Sentry.captureException(error);
	}
}

function getUser() {
	try {
		const user = localStorage.getItem(MyStorage.USER);
		return JSON.parse(user);
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

function setPushToken(token) {
	try {
		localStorage.setItem(MyStorage.MESSAGE_TOKEN, token);
	} catch (error) {
		Sentry.captureException(error);
	}
}

function getPushToken() {
	try {
		const token = localStorage.getItem(MyStorage.MESSAGE_TOKEN);
		return token;
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

function setCreds(creds) {
	// dont keep password on webversion
	const newCreds = creds;
	delete newCreds.password;
	try {
		localStorage.setItem(MyStorage.CREDS, JSON.stringify(newCreds));
	} catch (error) {
		Sentry.captureException(error);
	}
}
function getCreds() {
	try {
		const creds = localStorage.getItem(MyStorage.CREDS);
		return JSON.parse(creds);
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

async function init(tokens) {
	await setToken(tokens.access);
	await setRefreshToken(tokens.refresh);
	const { personId, userId } = jwtDecode(tokens.access);
	const user = { personId, userId };
	await setUser(user);
}

export default {
	setToken,
	setRefreshToken,
	logout,
	isTokenExpired,
	checkToken,
	setUser,
	getUser,
	getToken,
	getRefreshToken,
	setCreds,
	getCreds,
	setPushToken,
	getPushToken,
	purgeTokens,
	init,
};

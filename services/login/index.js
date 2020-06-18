import * as SecureStore from 'expo-secure-store';
import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import { Updates } from 'expo';
import moment from 'moment';
import Axios from 'axios';
import he from 'he';
import Sentry from '../sentry';
import MyStorage from '../../constants/myStorage';
import store from '../../store';
import API from '../../config/api';

async function purgePersitor() {
	try {
		await AsyncStorage.clear();
	} catch (error) {
		Sentry.captureException(error);
	}
	await store.persistor.purge();
	Updates.reloadFromCache();
}

async function setToken(token) {
	try {
		await SecureStore.setItemAsync(MyStorage.TOKEN, token);
	} catch (error) {
		Sentry.captureException(error);
	}
}

async function getToken() {
	try {
		const token = await SecureStore.getItemAsync(MyStorage.TOKEN);
		return token;
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

async function getRefreshToken() {
	try {
		const token = await SecureStore.getItemAsync(MyStorage.REFRESH);
		return token;
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

async function setRefreshToken(token) {
	try {
		await SecureStore.setItemAsync(MyStorage.REFRESH, token);
	} catch (error) {
		Sentry.captureException(error);
	}
}

async function purgeTokens() {
	try {
		await SecureStore.deleteItemAsync(MyStorage.TOKEN);
		await SecureStore.deleteItemAsync(MyStorage.REFRESH);
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

async function setUser(user) {
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
		await AsyncStorage.setItem(MyStorage.USER, JSON.stringify(user));
	} catch (error) {
		Sentry.captureException(error);
	}
}

async function getUser() {
	try {
		const user = await AsyncStorage.getItem(MyStorage.USER);
		return JSON.parse(user);
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

async function setPushToken(token) {
	try {
		await AsyncStorage.setItem(MyStorage.MESSAGE_TOKEN, token);
	} catch (error) {
		Sentry.captureException(error);
	}
}

async function getPushToken() {
	try {
		const token = await AsyncStorage.getItem(MyStorage.MESSAGE_TOKEN);
		return token;
	} catch (error) {
		Sentry.captureException(error);
		return null;
	}
}

async function setCreds(creds) {
	try {
		await SecureStore.setItemAsync(MyStorage.CREDS, JSON.stringify(creds));
	} catch (error) {
		Sentry.captureException(error);
	}
}
async function getCreds() {
	try {
		const creds = await SecureStore.getItemAsync(MyStorage.CREDS);
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

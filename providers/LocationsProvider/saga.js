import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../services/sentry';
import request from '../../utils/request';
import API from '../../config/api';
import { LOAD_LOCATIONS } from './constants';
import { setUser } from '../UserProvider/actions';
import login from '../../services/login';
import { locationsLoadedSuccess, locationsLoadedFail } from './actions';
import { loadNotifications } from '../NotificationsProvider/actions';

// The title from select list aren't direcly in the data,
// so we must retreive it and map it to the original array
function* retreiveSelectTitle(locations) {
	const ids = [];
	locations.forEach((location) => {
		const field3 = JSON.parse(location.field3);
		const field14 = JSON.parse(location.field14);
		if (field3) {
			field3.information.forEach((info) => {
				if (!isNaN(info.title)) {
					ids.push(info.title);
				}
			});
		}
		if (!(field14 === null || field14.length === 0)) {
			JSON.parse(location.field14).forEach((overview) => {
				if (!isNaN(overview.title)) {
					ids.push(overview.title);
				}
			});
		}
	});
	if (ids.length > 0) {
		const url = `${API()}/action/fetchGenData`;
		const options = {
			url,
			method: 'GET',
			params: {
				ajax: true,
				ids: ids.join(','),
			},
		};
		try {
			const { data } = yield call(request, options);
			const newLocations = [];
			locations.forEach((location) => {
				const field3 = JSON.parse(location.field3);
				const field14 = JSON.parse(location.field14);
				const information = [];
				const overview = [];
				if (field3) {
					field3.information.forEach(({ title, description }) => {
						const { type } = JSON.parse(data.find((el) => el.id === title.toString()).field4);
						information.push({ type, description, title });
					});
				}
				if (!(field14 === null || field14.length === 0)) {
					JSON.parse(location.field14).forEach(({ title, description }) => {
						const { title: type } = JSON.parse(data.find((el) => el.id === title.toString()).field4);
						overview.push({ type, description, title });
					});
				}
				const newLocation = {
					...location,
					field3: JSON.stringify({ information }),
					field14: JSON.stringify(overview),
				};
				newLocations.push(newLocation);
			});
			yield put(locationsLoadedSuccess(newLocations));
		} catch (error) {
			Sentry.captureException(error);
		}
	}
}

// Pour les comptes admin ou emergency (Roles avec une valeur de 0 et 2 dans le addInfo1),
// tu pourras juste faire field1=location comme requête.
// Pour les autres, tu feras field1=location&ids=1,2,3,4...
// addInfo1: role
// 0 = admin
// 1 = manager
// 2 = emergency team
// 3 = user
// 4 = resident
// 5 = guest
function* loadLocations(userId, role) {
	const url = `${API()}/action/fetchGenData`;

	const options = {
		url,
		method: 'GET',
		params: {
			ajax: true,
			field10: (role === '0' || role === '2') ? null : `%${userId}%`,
			field1: 'location',
			field12: true,
			partialMatch: true,
			field19: true,
		},
	};

	try {
		const { data } = yield call(request, options);
		let locations = [];
		if (typeof (data) === 'string') {
			// If i'ts an error string from the BE, just load a empty array
			// This will stop the loading spinner and prevent crash
			yield put(locationsLoadedSuccess(locations));
		} else {
			if (role === '2') {
				data.forEach((location) => {
					const emergency = JSON.parse(location.field18);
					if (emergency?.permission === 'true') {
						locations.push(location);
					}
				});
			} else {
				locations = data;
			}
			yield put(locationsLoadedSuccess(locations));
			yield call(retreiveSelectTitle, locations);
			const user = yield call(login.getUser);
			yield put(loadNotifications(user));
		}
	} catch (err) {
		yield put(locationsLoadedFail());
		Sentry.captureException(err);
	}
}

function* retreiveUser() {
	const user = yield call(login.getUser);
	try {
		const url = `${API()}/action/getPerson`;

		const options = {
			url,
			method: 'GET',
		};

		const { data } = yield call(request, options);

		if (typeof (data) === 'string') {
			yield call(login.logout);
		} else {
			const newUser = { ...user, ...data };
			yield call(login.setUser, newUser);
			yield put(setUser(newUser));
			yield call(loadLocations, newUser.id, newUser.addInfo1);
		}
	} catch (err) {
		yield call(loadLocations, user.id, user.addInfo1);
		Sentry.captureException(err);
	}
}

export default function* LocationProviderSaga() {
	// See example in containers/HomePage/saga.js
	yield takeLatest(LOAD_LOCATIONS, retreiveUser);
}

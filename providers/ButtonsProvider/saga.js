import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../services/sentry';
import API from '../../config/api';
import { LOAD_BUTTONS } from './constants';
import { buttonsLoadedSuccess, buttonsLoadedFail } from './actions';
import login from '../../services/login';
import { loadNotifications } from '../NotificationsProvider/actions';

// We had to create a custom fetch instead of axios request
// Because of a weird behaviour that wasn't returning every buttons for this request
// even when the request was good and fully returning every buttons on a browser or postman...
// With axios it was caching or smth that we do not understand
async function callLoadButtons(locationId) {
	const url = `${API()}/action/fetchGenData?ajax=true&field5=true&field15=${locationId}`;
	const options = {
		method: 'POST',
	};
	try {
		const res = await fetch(url, options);
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		Sentry.captureException(res);
		return 'error';
	} catch (error) {
		Sentry.captureException(error);
		return 'error';
	}
}

// addInfo1: role
// 0 = admin
// 1 = manager
// 2 = emergency team
// 3 = user
// 4 = resident
// 5 = guest
// addInfo7: JSON of accessible pages json { "[location-id]" : { "ids": "[comma-separated list of button ids]", "all": true or false, indicates that all pages are accessible. } }
function* loadButtons({ location }) {
	const { addInfo1: role, addInfo7 } = yield call(login.getUser);
	const userAccess = JSON.parse(addInfo7);
	const currentLocationUserAccess = userAccess?.[location.id]?.ids ?? [];
	const currentLocationUserFullAccess = userAccess?.[location.id]?.all ?? false;

	try {
		const data = yield call(callLoadButtons, location.id);

		if (typeof data === 'object') {
			let buttons = [];
			const emergencyLocation = JSON.parse(location.field18);
			const fullAccessLocation = emergencyLocation?.fullAccess === 'true';
			const isEmergencyUser = role === '2';
			const isAdmin = role === '0';
			if ((isEmergencyUser && fullAccessLocation) || isAdmin) {
				buttons = data;
			} else {
				data.forEach((button) => {
					const haveAccess = currentLocationUserFullAccess ? true : currentLocationUserAccess.split(',').find((id) => id === button.id);

					if (haveAccess) {
						buttons.push(button);
					}
				});
			}
			yield put(buttonsLoadedSuccess(buttons, location.id));
			const user = yield call(login.getUser);
			yield put(loadNotifications(user));
		} else {
			Sentry.captureException(`ButtonsProvider Saga, request response should receive an object, but received : ${data}`);
			yield put(buttonsLoadedFail(data));
		}
	} catch (err) {
		Sentry.captureException(err);
		yield put(buttonsLoadedFail());
	}
}

export default function* ButtonsProviderSaga() {
	yield takeLatest(LOAD_BUTTONS, loadButtons);
}

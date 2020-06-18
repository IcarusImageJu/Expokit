import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../../services/sentry';

import request from '../../../utils/request';
import { formSubmittedSuccess, formSubmittedFail } from './actions';
import login from '../../../services/login';

import { SUBMIT_FORM } from './constants';
import API from '../../../config/api';
import { setUser } from '../../../providers/UserProvider/actions';
import { subscribePushNotification } from '../../../providers/NotificationsProvider/actions';

function* retreiveUser() {
	try {
		const url = `${API()}/action/getPerson`;

		const options = {
			url,
			method: 'GET',
		};

		const { data } = yield call(request, options);

		if (typeof (data) === 'string') {
			yield put(formSubmittedFail());
		} else {
			const user = yield call(login.getUser);
			const newUser = { ...user, ...data };
			yield call(login.setUser, newUser);
			yield put(setUser(newUser));
			const termsAccepted = newUser.addInfo2 !== null ? newUser.addInfo2 : false;
			yield put(formSubmittedSuccess(termsAccepted));
			yield put(subscribePushNotification(newUser, false));
		}
	} catch (err) {
		yield put(formSubmittedFail(err));
		Sentry.captureException(err);
	}
}

function* submitLogin({ username, password }) {
	const creds = {
		username,
		password,
	};

	yield call(login.setCreds, creds);

	const url = `${API()}/action/login`;
	const options = {
		url,
		method: 'POST',
		params: {
			username,
			password,
			autoLogin: true,
			getToken: true,
			ajax: true,
		},
	};

	try {
		const { data } = yield call(request, options);

		if (typeof (data) === 'string') {
			yield put(formSubmittedFail());
		} else {
			yield call(login.init, data.tokens);
			yield call(retreiveUser);
		}
	} catch (err) {
		yield put(formSubmittedFail(err));
		// Sentry.captureException(err);
	}
}


// Individual exports for testing
export default function* LoginBoxSaga() {
	// See example in containers/HomePage/saga.js
	yield takeLatest(SUBMIT_FORM, submitLogin);
}

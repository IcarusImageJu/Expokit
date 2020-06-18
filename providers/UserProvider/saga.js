import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../services/sentry';
import request from '../../utils/request';
import API from '../../config/api';
import { setUser, submitUserFail, submitUserSuccess } from './actions';
import login from '../../services/login';
import { GET_USER, SUBMIT_USER, RESTORE_USER } from './constants';

function* submitUser({ user }) {
	try {
		const url = `${API()}/action/updatePerson`;
		const options = {
			url,
			method: 'POST',
			params: {
				...user,
				ajax: true,
			},
		};
		yield call(request, options);
		yield put(submitUserSuccess(user));
		yield put(setUser(user));
	} catch (error) {
		Sentry.captureException(error);
		yield put(submitUserFail());
	}
}

function* restoreUser() {
	try {
		const user = yield call(login.getUser);
		yield put(setUser(user, false));
	} catch (error) {
		Sentry.captureException(error);
	}
}

function* getUser() {
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
			const user = yield call(login.getUser);
			const newUser = { ...user, ...data };
			yield call(login.setUser, newUser);
			yield put(setUser(newUser));
		}
	} catch (err) {
		// yield call(loadLocations, ids, user.addInfo1);
		Sentry.captureException(err);
	}
}

export default function* UserProviderSaga() {
	yield takeLatest(GET_USER, getUser);
	yield takeLatest(SUBMIT_USER, submitUser);
	yield takeLatest(RESTORE_USER, restoreUser);
}

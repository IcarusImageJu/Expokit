import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../services/sentry';
import request from '../../utils/request';
import login from '../../services/login';

import { SUBMIT_PASSWORD } from './constants';
import API from '../../config/api';
import {
	submitPasswordFail,
	submitPasswordSuccess,
	submitPasswordIncorrectPassword,
	submitPasswordSecurity,
	submitPasswordNoMatch,
} from './actions';


function* submitPassword({ password: currentPassword, newPassword: password, confirmNewPassword }) {
	const creds = yield call(login.getCreds);
	const securityRegEx = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
	if (currentPassword !== creds.password) {
		yield put(submitPasswordIncorrectPassword());
	} else if (!securityRegEx.test(password)) {
		yield put(submitPasswordSecurity());
	} else if (password !== confirmNewPassword) {
		yield put(submitPasswordNoMatch());
	} else {
		const url = `${API()}/action/updatePerson`;
		const options = {
			url,
			method: 'POST',
			params: {
				currentPassword,
				password,
				ajax: true,
			},
		};

		try {
			yield call(request, options);
			const newCreds = {
				creds: creds.username,
				password,
			};
			yield call(login.setCreds, newCreds);
			yield put(submitPasswordSuccess());
		} catch (err) {
			Sentry.captureEvent(err);
			yield put(submitPasswordFail(err));
		}
	}
}


// Individual exports for testing
export default function* LoginBoxSaga() {
	// See example in containers/HomePage/saga.js
	yield takeLatest(SUBMIT_PASSWORD, submitPassword);
}

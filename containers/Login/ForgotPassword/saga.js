import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../../services/sentry';
import request from '../../../utils/request';
import { formSubmittedSuccess, formSubmittedFail } from './actions';

import { SUBMIT_FORM } from './constants';
import API from '../../../config/api';

function* submitForm({ email }) {
	// /action/forgotPassword?email=gabrielle.bastien1@gmail.com
	const url = `${API()}/action/forgotPassword`;

	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			email,
		},
	};

	try {
		const { data } = yield call(request, options);
		yield put(formSubmittedSuccess(data));
	} catch (err) {
		// console.log(err);
		Sentry.captureException(err);
		yield put(formSubmittedFail(err));
	}
}

// Individual exports for testing
export default function* ForgotPasswordSaga() {
	// See example in containers/HomePage/saga.js
	yield takeLatest(SUBMIT_FORM, submitForm);
}

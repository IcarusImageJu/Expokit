import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../../services/sentry';
import request from '../../../utils/request';
import { formSubmittedSuccess, formSubmittedFail } from './actions';

import { SUBMIT_FORM } from './constants';
import API from '../../../config/api';

function* submitForm() {
	const url = `${API()}/action/updatePerson`;

	const options = {
		url,
		method: 'POST',
		// set the terms to true
		params: {
			field2: true,
			ajax: true,
		},
	};

	try {
		// Call our request helper (see 'utils/request')
		const { data } = yield call(request, options);
		yield put(formSubmittedSuccess(data));
	} catch (err) {
		Sentry.captureException(err);
		yield put(formSubmittedFail(err));
	}
}


// Individual exports for testing
export default function* LoginTermsSaga() {
	// See example in containers/HomePage/saga.js
	yield takeLatest(SUBMIT_FORM, submitForm);
}

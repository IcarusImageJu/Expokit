import { takeLatest, call, put } from 'redux-saga/effects';
import Sentry from '../../services/sentry';
import request from '../../utils/request';

import API from '../../config/api';
import { CHECK_LOCATION } from './constants';
import { scanFail, setLocation } from './actions';

function* getLocation({ data: ids }) {
	const url = `${API()}/action/fetchGenData`;
	const options = {
		url,
		method: 'GET',
		params: {
			ajax: true,
			ids,
			field1: 'location',
		},
	};

	try {
		const { data } = yield call(request, options);
		yield put(setLocation(data.id));
	} catch (err) {
		Sentry.captureException(err);
		yield put(scanFail(err));
	}
}

export default function* scanSaga() {
	yield takeLatest(CHECK_LOCATION, getLocation);
}

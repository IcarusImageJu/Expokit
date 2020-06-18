import { takeLatest, call, put } from 'redux-saga/effects';
import he from 'he';
import Sentry from '../../../services/sentry';
import request from '../../../utils/request';
import { formSubmittedSuccess, formSubmittedFail } from './actions';

import { SUBMIT_FORM } from './constants';
import API from '../../../config/api';
import { t } from '../../../services/i18n';
// import MASTER_EMAIL from '../../config/master';

function* submitForm({
	email: emailNotEncoded, name, message, phone,
}) {
	const url = `${API()}/action/contactUs`;

	const field1 = he.encode(name);
	const fieldName1 = he.encode(t('fullName'));
	const field2 = he.encode(phone);
	const fieldName2 = he.encode(t('phone'));
	const content = he.encode(message);
	const email = he.encode(emailNotEncoded);
	const subject = he.encode(t('contactMailSubject'));

	const options = {
		url,
		method: 'POST',
		params: {
			// subject: sujet du courriel
			// directEmail: receiver
			// email: sender
			// count: nbr de paramètres extra + 1 (mettons que tu as field1, field2, field3, count sera 4)
			// field1: valeur du field1
			// fieldName1: nom du field1
			// ... tu peux mettre autant de fieldX que tu veux je crois
			// C'est en ajax de base donc t'es good pour ça
			subject,
			ajax: true,
			// directEmail: MASTER_EMAIL(),
			email,
			field1,
			fieldName1,
			field2,
			fieldName2,
			content,
			count: 3,
		},
	};
	try {
		const { data } = yield call(request, options);

		yield put(formSubmittedSuccess(data));
	} catch (err) {
		Sentry.captureException(err);
		yield put(formSubmittedFail(err));
	}
}


// Individual exports for testing
export default function* LoginBoxSaga() {
	// See example in containers/HomePage/saga.js
	yield takeLatest(SUBMIT_FORM, submitForm);
}

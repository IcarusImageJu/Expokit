import {
	takeLatest, call, put, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import Sentry from '../../services/sentry';
import request from '../../utils/request';
import API from '../../config/api';
import {
	LOAD_CHECKLIST,
	SEND_RESPONSE,
	DELETE_QUESTION_NFC,
	SET_QUESTION_NFC_VALIDATION,
	ADD_QUESTION_NFC,
	EDIT_QUESTION_NFC,
	LOAD_RESPONSES_BY_IDS,
} from './constants';
import {
	checklistLoadedSuccess,
	checklistLoadedFail,
	sendResponseFail,
	sendResponseSuccess,
	loadResponsesSuccess,
	loadResponsesFail,
	addQuestionNfcSuccess,
} from './actions';
import { loadNotifications } from '../NotificationsProvider/actions';
import login from '../../services/login';
// load response
function* loadResponses(id) {
	const url = `${API()}/action/fetchGenData`;
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			field1: 'response',
			field2: id.toString(),
		},
	};
	try {
		const { data } = yield call(request, options);

		if (data !== 'error') {
			yield put(loadResponsesSuccess(data));
		} else {
			Sentry.captureMessage(data);
			yield put(loadResponsesFail(data));
		}
	} catch (err) {
		Sentry.captureException(err);
		yield put(loadResponsesFail(err));
	}
}

// send Response related
function* sendResponse(response) {
	const url = `${API()}/action/sbSendResponse`;
	const options = {
		url,
		method: 'GET',
		params: { ...response, ajax: true },
		headers: {
			'Content-Type': 'x-www-form-urlencoded',
		},
	};
	try {
		const { data } = yield call(request, options);
		if (data.error) {
			Sentry.captureMessage(data.error);
			yield put(sendResponseFail(data));
		} else {
			yield put(sendResponseSuccess(Number(response.checklist)));
		}
	} catch (error) {
		Sentry.captureException(error);
		yield put(sendResponseFail(error));
	}
}

function* responseHandler({ response }) {
	// loop trough keys in order to find pic
	const keys = Object.keys(response);
	const pics = [];
	keys.forEach((key) => {
		const isPic = key.includes('pic');
		if (isPic) {
			pics.push({ pic: response[key], name: key });
		}
	});
	// Check if we have found pic in our response
	if (pics.length > 0) {
		// Create the form data
		const form = new FormData();
		// In case of upload fail, prepare an object without the pics in it
		const responseWithoutPics = { ...response };
		// loop on pics to operate
		pics.forEach(({ name, pic }) => {
			const uriParts = pic.uri.split('.');
			const fileType = uriParts[uriParts.length - 1];
			// append the pics in the form data
			form.append('file', { uri: pic.uri, name: `${name}.${fileType}`, type: `image/${fileType}` });
			// remove the pic from the reponse without it
			delete responseWithoutPics[name];
		});
		form.append('ajax', true);
		const url = `${API()}/action/uploadSecureFile`;
		const options = {
			url,
			method: 'POST',
			data: form,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		try {
			// Try to upload our pics
			const { data } = yield call(request, options);

			if (data.error) {
				// In case of fail pics upload, call the response sender without the pics
				Sentry.captureMessage(data.error);
				yield call(sendResponse, responseWithoutPics);
			} else {
				const newResponse = { ...response };
				data.media.mediaIds.forEach((media) => {
					const split = media.split(' - ');
					const mediaId = split[0];
					const question = split[1].split('-')[1].split('.')[0];
					newResponse[question] = mediaId;
				});
				yield call(sendResponse, newResponse);
			}
		} catch (error) {
			Sentry.captureException(error);
			// In case of fail pics upload, call the response sender without the pics
			yield call(sendResponse, responseWithoutPics);
		}
	} else {
		// In case of no pics in the response
		yield call(sendResponse, response);
	}
}

// Checklist related
function* retreiveNFCSelectTitle(checklists) {
	const ids = [];
	checklists.forEach((checklist) => {
		const { questions } = JSON.parse(checklist.field8);
		questions.forEach(({ NFCValidation, NFCTag }) => {
			if (NFCValidation && NFCTag) {
				if (NFCTag.length > 0) {
					String(NFCTag).split(',').forEach((tag) => {
						ids.push(tag);
					});
				}
			}
		});
	});

	if (ids.length > 0) {
		const url = `${API()}/action/fetchGenData`;
		const options = {
			url,
			method: 'GET',
			params: {
				ajax: true,
				ids: ids.join(','),
				field1: 'nfc',
			},
		};
		try {
			const { data } = yield call(request, options);
			const newChecklists = [];
			checklists.forEach((checklist) => {
				const { questions } = JSON.parse(checklist.field8);
				const newQuestions = [];
				questions.forEach((question) => {
					if (question.NFCValidation && question.NFCTag) {
						const NFCTitle = [];
						const NFCData = [];
						question.NFCTag.split(',').forEach((tag) => {
							NFCTitle.push(data.find((el) => el.id === tag)?.field2 ?? '');
							NFCData.push(data.find((el) => el.id === tag)?.field3 ?? '');
						});
						newQuestions.push({ ...question, NFCTitle, NFCData });
					} else {
						newQuestions.push(question);
					}
				});
				const newChecklist = {
					...checklist,
					field8: JSON.stringify({ questions: newQuestions }),
				};
				newChecklists.push(newChecklist);
			});
			if (data !== 'error') {
				yield put(checklistLoadedSuccess(newChecklists));
			} else {
				Sentry.captureMessage(data);
				yield put(checklistLoadedFail(data));
			}
		} catch (err) {
			Sentry.captureException(err);
			yield put(checklistLoadedFail(err));
		}
	} else {
		yield put(checklistLoadedSuccess(checklists));
	}
}

function* loadChecklist({ id, ids }) {
	const url = `${API()}/action/fetchGenData`;
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			field1: 'checklist',
			ids: id ? id.toString() : ids,
		},
	};

	try {
		const { data } = yield call(request, options);
		if (typeof data === 'object') {
			yield put(checklistLoadedSuccess(data));
			yield call(retreiveNFCSelectTitle, data);
			yield call(loadResponses, data[0].id);
			const user = yield call(login.getUser);
			yield put(loadNotifications(user));
		} else {
			yield put(checklistLoadedFail(data));
		}
	} catch (err) {
		Sentry.captureException(err);
		yield put(checklistLoadedFail(err));
	}
}

function* deleteQuestionNfc({ value, questionIndex, checklist }) {
	const { questions } = JSON.parse(checklist.field8);
	const question = questions[questionIndex];

	let NFCTag = question.NFCTag.split(',');
	_.pullAt(NFCTag, [Number(value)]);
	NFCTag = NFCTag.join(',');
	question.NFCTag = NFCTag;

	delete question.NFCTitle;
	delete question.NFCData;
	questions[questionIndex] = question;
	const field8 = JSON.stringify({ questions });
	const url = `${API()}/action/manageGenData`;
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			id: checklist.id,
			field8,
		},
	};
	try {
		yield call(request, options);
	} catch (err) {
		Sentry.captureException(err);
	}
}

function* setQuestionNfcValidation({ value, questionIndex, checklist }) {
	const { questions } = JSON.parse(checklist.field8);
	const question = questions[questionIndex];
	question.NFCValidation = value;
	delete question.NFCTitle;
	delete question.NFCData;
	questions[questionIndex] = question;
	const field8 = JSON.stringify({ questions });
	const url = `${API()}/action/manageGenData`;
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			id: checklist.id,
			field8,
		},
	};
	try {
		yield call(request, options);
	} catch (err) {
		Sentry.captureException(err);
	}
}

function* saveQuestionWithNewNFC({ id, questionIndex, checklist }) {
	const { questions } = JSON.parse(checklist.field8);
	const question = questions[questionIndex];
	question.NFCTag = question.NFCTag ? `${question.NFCTag},${id}` : String(id);
	delete question.NFCTitle;
	delete question.NFCData;
	questions[questionIndex] = question;
	const field8 = JSON.stringify({ questions });
	const url = `${API()}/action/manageGenData`;
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			id: checklist.id,
			field8,
		},
	};
	try {
		yield call(request, options);
	} catch (err) {
		Sentry.captureException(err);
	}
}

// NFC Tag
// field1: “nfc”
// field2: name
// field3: code
// field4: location id
// field5: checklist id
// field6: question number
// field7: active
// field8: owner person id
// field9: is assigned
// field10: from wizard

function* addQuestionNfc({
	title, data: code, questionIndex, checklist,
}) {
	const url = `${API()}/action/manageGenData`;
	const user = yield call(login.getUser);
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			field1: 'nfc',
			field2: title,
			field3: code,
			field4: checklist.field3,
			field5: checklist.id,
			field6: questionIndex,
			field7: true,
			field8: user.personId,
			field9: true,
			field10: false,
		},
	};

	try {
		const { data } = yield call(request, options);
		const id = data.split('-')[1];
		yield put(addQuestionNfcSuccess(id, questionIndex, checklist));
		yield call(saveQuestionWithNewNFC, { id, questionIndex, checklist });
	} catch (err) {
		Sentry.captureException(err);
	}
}

function* editQuestionNfc({
	title, data, nfcIndex, questionIndex, checklist,
}) {
	const { questions } = JSON.parse(checklist.field8);
	const question = questions[questionIndex];
	const id = question.NFCTag.split(',')[nfcIndex];
	const url = `${API()}/action/manageGenData`;
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			id,
			field2: title,
			field3: data,
			field7: true,
		},
	};
	try {
		yield call(request, options);
	} catch (err) {
		Sentry.captureException(err);
	}
}

function* loadResponsesByIds({ ids }) {
	const url = `${API()}/action/fetchGenData`;
	const options = {
		url,
		method: 'POST',
		params: {
			ajax: true,
			field1: 'response',
			ids,
		},
	};
	try {
		const { data } = yield call(request, options);
		if (data !== 'error') {
			yield put(loadResponsesSuccess(data));
			// load the checklists that come with
			let checklistIds = [];
			data.forEach((response) => {
				checklistIds.push(response.field2);
			});
			checklistIds = _.uniq(checklistIds);
			yield fork(loadChecklist, { id: null, ids: checklistIds });
		} else {
			Sentry.captureMessage(data);
			yield put(loadResponsesFail(data));
		}
	} catch (err) {
		Sentry.captureException(err);
		yield put(loadResponsesFail(err));
	}
}

export default function* ChecklistsProviderSaga() {
	yield takeLatest(LOAD_CHECKLIST, loadChecklist);
	yield takeLatest(SEND_RESPONSE, responseHandler);
	yield takeLatest(DELETE_QUESTION_NFC, deleteQuestionNfc);
	yield takeLatest(SET_QUESTION_NFC_VALIDATION, setQuestionNfcValidation);
	yield takeLatest(ADD_QUESTION_NFC, addQuestionNfc);
	yield takeLatest(EDIT_QUESTION_NFC, editQuestionNfc);
	yield takeLatest(LOAD_RESPONSES_BY_IDS, loadResponsesByIds);
}

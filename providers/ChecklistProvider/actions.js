import {
	LOAD_CHECKLIST,
	CHECKLIST_LOADED_SUCCESS,
	CHECKLIST_LOADED_FAIL,
	DELETE_CURRENT_IN_PROGRESS,
	SET_QUESTION_RESPONSE,
	SET_QUESTION_PIC,
	SET_QUESTION_NFC,
	SET_QUESTION_DEFICIENCY,
	SET_QUESTION_NFC_VALIDATION,
	SEND_RESPONSE,
	SEND_RESPONSE_SUCCESS,
	SEND_RESPONSE_FAIL,
	LOAD_RESPONSES_SUCCESS,
	LOAD_RESPONSES_FAIL,
	RESET_LOADING,
	DELETE_QUESTION_NFC,
	ADD_QUESTION_NFC,
	ADD_QUESTION_NFC_SUCCESS,
	EDIT_QUESTION_NFC,
	LOAD_RESPONSES_BY_IDS,
} from './constants';

// Checklist related
export function loadChecklist(id, ids) {
	return {
		type: LOAD_CHECKLIST,
		id,
		ids,
	};
}

export function checklistLoadedSuccess(checklist) {
	return {
		type: CHECKLIST_LOADED_SUCCESS,
		checklist,
	};
}

export function checklistLoadedFail(err) {
	return {
		type: CHECKLIST_LOADED_FAIL,
		err,
	};
}

export function deleteCurrentInProgress(checklist) {
	return {
		type: DELETE_CURRENT_IN_PROGRESS,
		checklist,
	};
}

// Question related
export function setQuestionResponse(response, responseType, questionIndex, checklistId) {
	return {
		type: SET_QUESTION_RESPONSE,
		response,
		responseType,
		questionIndex,
		checklistId,
	};
}
export function setQuestionNFC(value, questionIndex, checklistId) {
	return {
		type: SET_QUESTION_NFC,
		value,
		questionIndex,
		checklistId,
	};
}
export function setQuestionDeficiency(active, message, questionIndex, checklistId) {
	return {
		type: SET_QUESTION_DEFICIENCY,
		active,
		message,
		questionIndex,
		checklistId,
	};
}
export function setQuestionPic(pic, questionIndex, checklistId) {
	return {
		type: SET_QUESTION_PIC,
		pic,
		questionIndex,
		checklistId,
	};
}
// Send response
export function sendResponse(response) {
	return {
		type: SEND_RESPONSE,
		response,
	};
}
export function sendResponseSuccess(checklist) {
	return {
		type: SEND_RESPONSE_SUCCESS,
		checklist,
	};
}
export function sendResponseFail(err) {
	return {
		type: SEND_RESPONSE_FAIL,
		err,
	};
}

// load Response
export function loadResponsesSuccess(responses) {
	return {
		type: LOAD_RESPONSES_SUCCESS,
		responses,
	};
}

export function loadResponsesFail(err) {
	return {
		type: LOAD_RESPONSES_FAIL,
		err,
	};
}

export function resetLoading() {
	return {
		type: RESET_LOADING,
	};
}

export function loadResponsesByIds(ids) {
	return {
		type: LOAD_RESPONSES_BY_IDS,
		ids,
	};
}

// NFC handler
export function setQuestionNfcValidation(value, questionIndex, checklist) {
	return {
		type: SET_QUESTION_NFC_VALIDATION,
		value,
		questionIndex,
		checklist,
	};
}

export function deleteQuestionNfc(value, questionIndex, checklist) {
	return {
		type: DELETE_QUESTION_NFC,
		value,
		questionIndex,
		checklist,
	};
}

export function addQuestionNfc(title, data, questionIndex, checklist) {
	return {
		type: ADD_QUESTION_NFC,
		title,
		data,
		questionIndex,
		checklist,
	};
}

export function addQuestionNfcSuccess(id, questionIndex, checklist) {
	return {
		type: ADD_QUESTION_NFC_SUCCESS,
		id,
		questionIndex,
		checklist,
	};
}

export function editQuestionNfc(title, data, nfcIndex, questionIndex, checklist) {
	return {
		type: EDIT_QUESTION_NFC,
		title,
		data,
		nfcIndex,
		questionIndex,
		checklist,
	};
}

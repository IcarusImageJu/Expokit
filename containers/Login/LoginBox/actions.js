import {
	SUBMIT_FORM, CHANGE_INPUT, FORM_SUBMITTED_SUCCESS, ERROR_LOGIN, FORM_SUBMITTED_FAIL, UNMOUNT, TRYLOCALAUTH, CANLOCALAUTH,
} from './constants';

// LOAD LIST
export function changeInput(value, name) {
	return {
		type: CHANGE_INPUT,
		name,
		value,
	};
}

export function submitForm(username, password, remember) {
	const usernameIsEmpty = username.length === 0;
	const passwordIsEmpty = password.length === 0;
	if (usernameIsEmpty || passwordIsEmpty) {
		const error = {
			username: usernameIsEmpty,
			password: passwordIsEmpty,
		};
		return {
			type: ERROR_LOGIN,
			error,
		};
	}
	return {
		type: SUBMIT_FORM,
		username,
		password,
		remember,
	};
}

export function formSubmittedSuccess(terms) {
	return {
		type: FORM_SUBMITTED_SUCCESS,
		terms,
	};
}

export function formSubmittedFail(err) {
	return {
		type: FORM_SUBMITTED_FAIL,
		err,
	};
}

export function unmount() {
	return {
		type: UNMOUNT,
	};
}

export function tryLocalAuth() {
	return {
		type: TRYLOCALAUTH,
	};
}

export function canLocalAuth(support) {
	return {
		type: CANLOCALAUTH,
		support,
	};
}

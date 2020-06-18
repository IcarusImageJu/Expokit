import {
	RESET,
	CHANGE_INPUT,
	SUBMIT_PASSWORD,
	SUBMIT_PASSWORD_NO_MATCH,
	SUBMIT_PASSWORD_INCORRECT_PASSWORD,
	SUBMIT_PASSWORD_FAIL,
	SUBMIT_PASSWORD_SUCCESS,
	SUBMIT_PASSWORD_SECURITY,
} from './constants';

export function reset() {
	return {
		type: RESET,
	};
}

export function changeInput(value, name) {
	return {
		type: CHANGE_INPUT,
		value,
		name,
	};
}

export function submitPassword(password, newPassword, confirmNewPassword) {
	return {
		type: SUBMIT_PASSWORD,
		password,
		newPassword,
		confirmNewPassword,
	};
}

export function submitPasswordIncorrectPassword() {
	return {
		type: SUBMIT_PASSWORD_INCORRECT_PASSWORD,
	};
}

export function submitPasswordSecurity() {
	return {
		type: SUBMIT_PASSWORD_SECURITY,
	};
}

export function submitPasswordNoMatch() {
	return {
		type: SUBMIT_PASSWORD_NO_MATCH,
	};
}

export function submitPasswordFail(err) {
	return {
		type: SUBMIT_PASSWORD_FAIL,
		err,
	};
}

export function submitPasswordSuccess() {
	return {
		type: SUBMIT_PASSWORD_SUCCESS,
	};
}

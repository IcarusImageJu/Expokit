import {
	CHANGE_INPUT, SUBMIT_FORM, ERROR, FORM_SUBMITTED_SUCCESS, FORM_SUBMITTED_FAIL, RESET,
} from './constants';
import validateEmail from '../../../utils/validateEmail';

export function changeInput(value, name) {
	return {
		type: CHANGE_INPUT,
		value,
		name,
	};
}

export function submitForm(email) {
	const isEmailEmpty = email.length < 5;
	const isEmailValid = validateEmail(email);

	if (isEmailEmpty || !isEmailValid) {
		const error = {
			email: {
				empty: isEmailEmpty,
				valid: isEmailValid,
			},
		};
		return {
			type: ERROR,
			error,
		};
	}

	return {
		type: SUBMIT_FORM,
		email,
	};
}

export function formSubmittedSuccess(res) {
	return {
		type: FORM_SUBMITTED_SUCCESS,
		res,
	};
}

export function formSubmittedFail(err) {
	return {
		type: FORM_SUBMITTED_FAIL,
		err,
	};
}

export function reset() {
	return {
		type: RESET,
	};
}

export function unmount() {
	return {
		type: RESET,
	};
}

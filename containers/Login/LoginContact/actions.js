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

export function submitForm(email, name, message, phone) {
	const isEmailEmpty = email.length < 5;
	const isEmailValid = validateEmail(email);
	const isNameEmpty = name.length < 3;
	const isMessageEmpty = message.length === 0;

	if (isEmailEmpty || isNameEmpty || isMessageEmpty || !isEmailValid) {
		const error = {
			email: {
				empty: isEmailEmpty,
				valid: isEmailValid,
			},
			name: isNameEmpty,
			message: isMessageEmpty,
		};
		return {
			type: ERROR,
			error,
		};
	}

	return {
		type: SUBMIT_FORM,
		email,
		name,
		message,
		phone,
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
		type: ERROR,
		error: {
			email: {
				empty: false,
				valid: true,
			},
			name: false,
			message: false,
		},
	};
}

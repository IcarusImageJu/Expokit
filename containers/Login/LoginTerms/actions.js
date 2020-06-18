import {
	SUBMIT_FORM, FORM_SUBMITTED_SUCCESS, FORM_SUBMITTED_FAIL, RESET,
} from './constants';


export function submitForm() {
	return {
		type: SUBMIT_FORM,
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

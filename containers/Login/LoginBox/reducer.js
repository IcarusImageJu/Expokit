/*
 *
 * LoginBox reducer
 *
 */
import produce from 'immer';
import {
	SUBMIT_FORM,
	CHANGE_INPUT,
	ERROR_LOGIN,
	FORM_SUBMITTED_FAIL,
	FORM_SUBMITTED_SUCCESS,
	UNMOUNT,
	TRYLOCALAUTH,
	CANLOCALAUTH,
} from './constants';
import { LOCAL_AUTH_TRY_MAX } from '../../../config/master';

// The initial state of the App
export const initialState = {
	loading: false,
	username: '',
	password: '',
	remember: false,
	terms: false,
	sent: false,
	tryAuth: 0,
	localAuthSupport: false,
	error: {
		username: false,
		password: false,
		match: false,
	},
};

/* eslint-disable default-case, no-param-reassign */
const loginBoxReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case SUBMIT_FORM:
			draft.loading = true;
			draft.error.username = false;
			draft.error.password = false;
			draft.error.match = false;
			break;
		case CHANGE_INPUT:
			draft[action.name] = action.value;
			draft.error.username = false;
			draft.error.password = false;
			draft.error.match = false;
			break;
		case FORM_SUBMITTED_SUCCESS:
			draft.sent = true;
			draft.terms = action.terms;
			break;
		case FORM_SUBMITTED_FAIL:
			draft.loading = false;
			draft.error.match = true;
			draft.tryAuth = LOCAL_AUTH_TRY_MAX + 1;
			break;
		case TRYLOCALAUTH:
			draft.tryAuth += 1;
			break;
		case ERROR_LOGIN:
			Object.keys(action.error).forEach((errorType) => {
				draft.error[errorType] = action.error[errorType];
			});
			draft.tryAuth = LOCAL_AUTH_TRY_MAX + 1;
			break;
		case UNMOUNT:
			draft.error.match = false;
			draft.tryAuth = 0;
			break;
		case CANLOCALAUTH:
			draft.localAuthSupport = action.support;
			break;
	}
});

export default loginBoxReducer;

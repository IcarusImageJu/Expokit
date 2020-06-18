/*
 *
 * ForgotPassword reducer
 *
 */
import produce from 'immer';
import {
	SUBMIT_FORM, CHANGE_INPUT, ERROR, RESET, FORM_SUBMITTED_SUCCESS, FORM_SUBMITTED_FAIL,
} from './constants';

// The initial state of the App
export const initialState = {
	loading: false,
	email: '',
	error: {
		email: {
			empty: false,
			valid: true,
		},
		server: false,
	},
	sent: false,
};

/* eslint-disable default-case, no-param-reassign */
const ForgotPasswordReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case SUBMIT_FORM:
			draft.loading = true;
			draft.error.email.empty = false;
			draft.error.email.valid = true;
			draft.error.server = false;
			break;
		case CHANGE_INPUT:
			draft[action.name] = action.value;
			draft.error.email.empty = false;
			draft.error.email.valid = true;
			draft.error.server = false;
			break;
		case RESET:
			Object.keys(initialState).forEach((stateType) => {
				draft[stateType] = initialState[stateType];
			});
			break;
		case ERROR:
			Object.keys(action.error).forEach((errorType) => {
				draft.error[errorType] = action.error[errorType];
			});
			break;
		case FORM_SUBMITTED_SUCCESS:
			draft.loading = false;
			draft.sent = true;
			break;
		case FORM_SUBMITTED_FAIL:
			draft.loading = false;
			draft.error.server = true;
			break;
	}
});

export default ForgotPasswordReducer;

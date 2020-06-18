/*
 *
 * LoginContact reducer
 *
 */
import produce from 'immer';
import {
	SUBMIT_FORM, CHANGE_INPUT, ERROR, RESET, FORM_SUBMITTED_FAIL, FORM_SUBMITTED_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
	loading: false,
	email: '',
	name: '',
	message: '',
	phone: '',
	error: {
		message: false,
		name: false,
		email: {
			empty: false,
			valid: true,
		},
		server: false,
	},
	sent: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginContactReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case SUBMIT_FORM:
			draft.loading = true;
			draft.error.name = false;
			draft.error.message = false;
			draft.error.email.empty = false;
			draft.error.email.valid = true;
			draft.error.server = false;
			break;
		case CHANGE_INPUT:
			draft[action.name] = action.value;
			draft.error.name = false;
			draft.error.message = false;
			draft.error.email.empty = false;
			draft.error.email.valid = true;
			draft.error.server = false;
			break;
		case FORM_SUBMITTED_FAIL:
			draft.loading = false;
			draft.error.server = true;
			break;
		case FORM_SUBMITTED_SUCCESS:
			draft.loading = false;
			draft.sent = true;
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
	}
});

export default loginContactReducer;

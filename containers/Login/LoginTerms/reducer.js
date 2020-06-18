/*
 *
 * LoginContact reducer
 *
 */
import produce from 'immer';
import {
	SUBMIT_FORM, ERROR, FORM_SUBMITTED_SUCCESS, FORM_SUBMITTED_FAIL,
} from './constants';

// The initial state of the App
export const initialState = {
	loading: false,
	error: {
		server: false,
	},
	sent: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginTermsReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case SUBMIT_FORM:
			draft.loading = true;
			draft.error.server = false;
			draft.sent = false;
			break;
		case FORM_SUBMITTED_SUCCESS:
			draft.loading = false;
			draft.sent = true;
			draft.error.server = false;
			break;
		case FORM_SUBMITTED_FAIL:
			draft.loading = false;
			draft.error.server = true;
			break;
		case ERROR:
			Object.keys(action.error).forEach((errorType) => {
				draft.error[errorType] = action.error[errorType];
			});
			break;
	}
});

export default loginTermsReducer;

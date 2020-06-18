
import produce from 'immer';
import {
	RESET,
	CHANGE_INPUT,
	SUBMIT_PASSWORD_INCORRECT_PASSWORD,
	SUBMIT_PASSWORD_NO_MATCH,
	SUBMIT_PASSWORD,
	SUBMIT_PASSWORD_FAIL,
	SUBMIT_PASSWORD_SUCCESS,
	SUBMIT_PASSWORD_SECURITY,
} from './constants';

// The initial state of the App
export const initialState = {
	newPassword: '',
	password: '',
	confirmNewPassword: '',
	userChanged: false,
	loading: false,
	error: {
		password: {
			current: false,
			match: false,
			server: false,
			security: false,
		},
	},
	sent: false,
};

/* eslint-disable default-case, no-param-reassign */
const myAccountReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case CHANGE_INPUT:
			draft[action.name] = action.value;
			draft.error.password.current = false;
			draft.error.password.match = false;
			draft.error.password.server = false;
			draft.error.password.security = false;
			draft.sent = false;
			break;
		case SUBMIT_PASSWORD_INCORRECT_PASSWORD:
			draft.error.password.current = true;
			break;
		case SUBMIT_PASSWORD_NO_MATCH:
			draft.error.password.match = true;
			break;
		case SUBMIT_PASSWORD_SECURITY:
			draft.error.password.security = true;
			break;
		case SUBMIT_PASSWORD:
			draft.loading = true;
			break;
		case SUBMIT_PASSWORD_FAIL:
			draft.loading = false;
			draft.error.password.server = true;
			break;
		case SUBMIT_PASSWORD_SUCCESS:
			draft.loading = false;
			draft.sent = true;
			draft.password = '';
			draft.confirmNewPassword = '';
			draft.newPassword = '';
			break;
		case RESET:
			Object.keys(initialState).forEach((stateType) => {
				draft[stateType] = initialState[stateType];
			});
			break;
	}
});

export default myAccountReducer;

/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import { ERROR, LOADED } from './constants';

// The initial state of the App
export const initialState = {
	loading: true,
	error: false,
	user: {},
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case ERROR:
			draft.error = action.error;
			draft.loading = false;
			break;
		case LOADED:
			draft.loading = false;
			break;
	}
});

export default appReducer;

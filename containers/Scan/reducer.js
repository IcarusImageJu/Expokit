/*
 *
 * LoginContact reducer
 *
 */
import produce from 'immer';
import {
	RESET, UNMOUNT, SCANNING, PERMISSION, SET_LOCATION, CHECK_LOCATION, LOCATION_CHECKED_FAIL,
} from './constants';

// The initial state of the App
export const initialState = {
	loading: true,
	location: null,
	scanned: false,
	havePermission: false,
	data: null,
};

/* eslint-disable default-case, no-param-reassign */
const scanReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case PERMISSION:
			draft.havePermission = action.status;
			draft.loading = false;
			break;
		case SCANNING:
			draft.loading = true;
			draft.data = action.data;
			break;
		case UNMOUNT:
			Object.keys(initialState).forEach((stateType) => {
				draft[stateType] = initialState[stateType];
			});
			break;
		case SET_LOCATION:
			draft.loading = false;
			draft.data = null;
			draft.scanned = true;
			draft.location = action.location;
			break;
		case CHECK_LOCATION:
			draft.loading = true;
			break;
		case LOCATION_CHECKED_FAIL:
			draft.loading = false;
			draft.data = null;
			draft.scanned = true;
			draft.location = null;
			break;
		case RESET:
			Object.keys(initialState).forEach((stateType) => {
				draft[stateType] = initialState[stateType];
			});
			break;
	}
});

export default scanReducer;

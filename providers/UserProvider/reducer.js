import produce from 'immer';

import {
	RESET, SUBMIT_USER, SUBMIT_USER_SUCCESS, SUBMIT_USER_FAIL, SET_USER, CHANGE_INPUT,
} from './constants';

// The initial state of the App
export const initialState = {
	user: {
		activePlan: null,
		addInfo1: null,
		addInfo10: null,
		addInfo11: null,
		addInfo12: null,
		addInfo13: null,
		addInfo14: null,
		addInfo15: null,
		addInfo16: null,
		addInfo17: null,
		addInfo18: null,
		addInfo19: null,
		addInfo2: null,
		addInfo20: null,
		addInfo21: null,
		addInfo22: null,
		addInfo23: null,
		addInfo24: null,
		addInfo25: null,
		addInfo26: null,
		addInfo27: null,
		addInfo28: null,
		addInfo29: null,
		addInfo3: null,
		addInfo30: null,
		addInfo31: null,
		addInfo32: null,
		addInfo33: null,
		addInfo34: null,
		addInfo35: null,
		addInfo36: null,
		addInfo37: null,
		addInfo38: null,
		addInfo39: null,
		addInfo4: null,
		addInfo40: null,
		addInfo5: null,
		addInfo6: null,
		addInfo7: null,
		addInfo8: null,
		addInfo9: null,
		address: null,
		city: null,
		country: null,
		createdTime: null,
		email: null,
		firstName: null,
		gender: null,
		id: null,
		lastName: null,
		mediaId: null,
		newsletter: null,
		personId: null,
		phone: null,
		postalCode: null,
		province: null,
		renewPlan: null,
		shopFactor: null,
		siteId: null,
		title: null,
		userId: null,
		views: null,
		lastUpdated: null,
	},
	loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const UserProviderReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case RESET:
			break;
		case SUBMIT_USER:
			draft.loading = true;
			break;
		case SUBMIT_USER_SUCCESS:
			draft.loading = false;
			draft.user = { ...draft.user, ...action.user };
			break;
		case SUBMIT_USER_FAIL:
			draft.loading = false;
			break;
		case CHANGE_INPUT:
			draft.user[action.name] = action.value;
			break;
		case SET_USER:
			draft.user = { ...draft.user, ...action.user };
			draft.loading = false;
			break;
	}
});

export default UserProviderReducer;

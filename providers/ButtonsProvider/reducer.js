import produce from 'immer';
import _ from 'lodash';
import {
	LOAD_BUTTONS, BUTTONS_LOADED_SUCCESS, BUTTONS_LOADED_FAIL,
} from './constants';

export const initialState = {
	loading: true,
	buttons: [],
};

/* eslint-disable default-case, no-param-reassign */
const buttonsProviderReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case LOAD_BUTTONS:
			draft.loading = true;
			break;
		case BUTTONS_LOADED_SUCCESS:
			if (action.locationId) {
				draft.buttons = _.remove(draft.buttons, { field15: Number(action.locationId) });
			}
			draft.buttons = _.uniqBy([...action.buttons, ...draft.buttons], 'id');
			// Order the buttons by position in the UI
			draft.buttons = _.orderBy(draft.buttons, ['field14'], 'asc');
			draft.loading = false;
			break;
		case BUTTONS_LOADED_FAIL:
			draft.loading = false;
			break;
	}
});

export default buttonsProviderReducer;

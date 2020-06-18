import produce from 'immer';
import _ from 'lodash';

import { LOCATIONS_LOADED_SUCCESS, LOAD_LOCATIONS, LOCATIONS_LOADED_FAIL } from './constants';

export const initialState = {
	loading: true,
	locations: [],
};

/* eslint-disable default-case, no-param-reassign */
const locationsProviderReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case LOAD_LOCATIONS:
			draft.loading = true;
			break;
		case LOCATIONS_LOADED_SUCCESS:
			draft.locations = action.locations;
			draft.locations = _.orderBy(draft.locations, ['field2'], 'asc');
			draft.loading = false;
			break;
		case LOCATIONS_LOADED_FAIL:
			draft.loading = false;
			break;
	}
});

export default locationsProviderReducer;

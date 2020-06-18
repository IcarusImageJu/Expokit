import produce from 'immer';
import {
	RESET,
	CHANGE_INPUT,
} from './constants';

// The initial state of the App
export const initialState = {
	filter: '',
	filteredLocations: [],
};

/* eslint-disable default-case, no-param-reassign */
const searchReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case CHANGE_INPUT:
			draft[action.name] = action.value;
			draft.filteredLocations = action.filteredLocations;
			break;
		case RESET:
			Object.keys(initialState).forEach((stateType) => {
				draft[stateType] = initialState[stateType];
			});
			break;
	}
});

export default searchReducer;


import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectButtons = (state) => state.buttons || initialState;

const makeSelectButtons = () => createSelector(
	selectButtons,
	(substate) => substate.buttons,
);

const makeSelectButtonsLoading = () => createSelector(
	selectButtons,
	(substate) => substate.loading,
);

export {
	selectButtons,
	makeSelectButtons,
	makeSelectButtonsLoading,
};

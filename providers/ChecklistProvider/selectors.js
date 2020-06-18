
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectChecklists = (state) => state.checklists || initialState;

const makeSelectChecklists = () => createSelector(
	selectChecklists,
	(substate) => substate.checklists,
);

const makeSelectResponses = () => createSelector(
	selectChecklists,
	(substate) => substate.responses,
);

const makeSelectChecklistsInProgress = () => createSelector(
	selectChecklists,
	(substate) => substate.inProgress,
);

const makeSelectChecklistsLoading = () => createSelector(
	selectChecklists,
	(substate) => substate.loading,
);

const makeSelectResponsessLoading = () => createSelector(
	selectChecklists,
	(substate) => substate.loadingResponses,
);

const makeSelectChecklistsLoadingSendResponse = () => createSelector(
	selectChecklists,
	(substate) => substate.loadingSendResponse,
);

export {
	selectChecklists,
	makeSelectChecklists,
	makeSelectResponses,
	makeSelectResponsessLoading,
	makeSelectChecklistsInProgress,
	makeSelectChecklistsLoading,
	makeSelectChecklistsLoadingSendResponse,
};

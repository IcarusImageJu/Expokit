
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLocations = (state) => state.locations || initialState;

const makeSelectLocations = () => createSelector(
	selectLocations,
	(substate) => substate.locations,
);

const makeSelectLocationsLoading = () => createSelector(
	selectLocations,
	(substate) => substate.loading,
);

const makeSelectLocation = (id) => createSelector(
	selectLocations,
	(substate) => substate.locations.find((location) => location.id === id),
);

export {
	selectLocations,
	makeSelectLocation,
	makeSelectLocations,
	makeSelectLocationsLoading,
};

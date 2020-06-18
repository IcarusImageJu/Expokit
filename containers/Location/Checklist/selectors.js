import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLocationChecklistDomain = (state) => state.locationchecklist || initialState;

const makeSelectLocationChecklist = () => createSelector(
	selectLocationChecklistDomain,
	(substate) => substate,
);

export default makeSelectLocationChecklist;
export { selectLocationChecklistDomain };

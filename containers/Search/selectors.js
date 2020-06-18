import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSearchDomain = (state) => state.search || initialState;


const makeSelectSearch = () => createSelector(
	selectSearchDomain,
	(substate) => substate,
);

export default makeSelectSearch;
export { selectSearchDomain };

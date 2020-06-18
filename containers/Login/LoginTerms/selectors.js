import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the LoginContct state domain
 */

const selectLoginTermsDomain = (state) => state.loginterms || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginContact
 */

const makeSelectLoginTerms = () => createSelector(
	selectLoginTermsDomain,
	(substate) => substate,
);

export default makeSelectLoginTerms;
export { selectLoginTermsDomain };

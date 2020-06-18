import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the LoginBox state domain
 */

const selectLoginBoxDomain = (state) => state.loginbox || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginBox
 */

const makeSelectLoginBox = () => createSelector(
	selectLoginBoxDomain,
	(substate) => substate,
);

export default makeSelectLoginBox;
export { selectLoginBoxDomain };

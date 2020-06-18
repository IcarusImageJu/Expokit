import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ForgotPassword state domain
 */

const selectForgotPasswordDomain = (state) => state.forgotpassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginContact
 */

const makeSelectForgotPassword = () => createSelector(
	selectForgotPasswordDomain,
	(substate) => substate,
);

export default makeSelectForgotPassword;
export { selectForgotPasswordDomain };

/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserProviderDomain = (state) => state.user || initialState;

const makeSelectUser = () => createSelector(
	selectUserProviderDomain,
	(substate) => substate.user,
);

const makeSelectUserLoading = () => createSelector(
	selectUserProviderDomain,
	(substate) => substate.loading,
);

export default makeSelectUser;

export {
	selectUserProviderDomain,
	makeSelectUser,
	makeSelectUserLoading,
};

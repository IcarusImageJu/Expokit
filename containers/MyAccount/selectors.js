import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyAccountDomain = (state) => state.myaccount || initialState;

const makeSelectMyAccount = () => createSelector(
	selectMyAccountDomain,
	(substate) => substate,
);

export default makeSelectMyAccount;
export { selectMyAccountDomain };

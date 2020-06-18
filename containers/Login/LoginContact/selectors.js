import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginContactDomain = (state) => state.logincontact || initialState;

const makeSelectLoginContact = () => createSelector(
	selectLoginContactDomain,
	(substate) => substate,
);

export default makeSelectLoginContact;
export { selectLoginContactDomain };

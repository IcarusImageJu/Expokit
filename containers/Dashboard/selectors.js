import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardDomain = (state) => state.dashboard || initialState;

const makeSelectDashboard = () => createSelector(
	selectDashboardDomain,
	(substate) => substate,
);

export default makeSelectDashboard;
export { selectDashboardDomain };

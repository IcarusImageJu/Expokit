import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectScanDomain = (state) => state.scan || initialState;

const makeSelectScan = () => createSelector(
	selectScanDomain,
	(substate) => substate,
);

export default makeSelectScan;
export { selectScanDomain };

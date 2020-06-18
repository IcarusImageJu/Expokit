/**
 * The root state selectors
 */

import { createSelector } from 'reselect';

const selectNetwork = (state) => state.network;

const makeSelectNetworkIsConnected = () => createSelector(
	selectNetwork,
	(substate) => substate.isConnected,
);

export {
	selectNetwork,
	makeSelectNetworkIsConnected,
};

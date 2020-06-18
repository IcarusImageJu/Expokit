
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectNotifications = (state) => state.notifications || initialState;

const makeSelectNotifications = () => createSelector(
	selectNotifications,
	(substate) => substate.notifications,
);

const makeSelectPageNotifications = () => createSelector(
	selectNotifications,
	(substate) => substate.page,
);

const makeSelectNotificationsLoading = () => createSelector(
	selectNotifications,
	(substate) => substate.loading,
);

export {
	selectNotifications,
	makeSelectNotifications,
	makeSelectPageNotifications,
	makeSelectNotificationsLoading,
};

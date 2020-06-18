import produce from 'immer';
import _ from 'lodash';
import moment from 'moment';
import {
	LOAD_NOTIFICATIONS,
	LOAD_NOTIFICATIONS_SUCCESS,
	LOAD_NOTIFICATIONS_FAIL,
	SEEN_NOTIFICATION,
	DELETE_NOTIFICATION,
	RESET_PAGE,
} from './constants';

export const initialState = {
	loading: false,
	notifications: [],
	page: 1,
};

/* eslint-disable default-case, no-param-reassign */
const notificationsProviderReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case LOAD_NOTIFICATIONS:
			draft.loading = true;
			break;
		case LOAD_NOTIFICATIONS_SUCCESS:
			draft.notifications = _
				.uniqBy([...action.notifications], 'id')
				.sort((a, b) => (
					moment(b.dateField1).diff(moment(a.dateField1))
				));
			draft.page = action?.page ?? 1;
			draft.loading = false;
			break;
		case LOAD_NOTIFICATIONS_FAIL:
			draft.loading = false;
			break;
		case SEEN_NOTIFICATION: {
			const indexNotification = _.findIndex(draft.notifications, { id: action.id });
			draft.notifications[indexNotification].field4 = 'true';
			break;
		}
		case DELETE_NOTIFICATION:
			_.remove(draft.notifications, { id: action.id });
			break;
		case RESET_PAGE:
			draft.page = 1;
			break;
	}
});

export default notificationsProviderReducer;

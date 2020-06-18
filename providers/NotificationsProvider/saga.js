import {
	takeLatest, takeEvery, call, put,
} from 'redux-saga/effects';
import * as Permissions from 'expo-permissions';
import _ from 'lodash';
import Sentry from '../../services/sentry';
import request from '../../utils/request';
import API from '../../config/api';
import {
	LOAD_NOTIFICATIONS, SEEN_NOTIFICATION, DELETE_NOTIFICATION, SUBSCRIBE_PUSH_NOTIFICATIONS,
} from './constants';
import login from '../../services/login';
import {
	loadNotificationsSuccess,
	loadNotificationsFail,
	seenNotificationSuccess,
	seenNotificationFail,
	deleteNotificationSuccess,
	deleteNotificationFail,
} from './actions';
import { loadResponsesByIds, loadChecklist } from '../ChecklistProvider/actions';

function* registerForPushNotifications({ user }) {
	const { personId } = user;
	try {
		const { status } = yield call(Permissions.askAsync, Permissions.USER_FACING_NOTIFICATIONS, Permissions.NOTIFICATIONS);
		if (status !== 'granted') {
			Sentry.addBreadcrumb({
				category: 'notifications',
				message: 'Notification permission not granted',
				data: status,
				level: Sentry.Severity.Info,
			});
		} else {
			try {
				const token = yield call(login.getPushToken);
				const url = `${API()}/action/pushMobileNotification`;
				const options = {
					url,
					method: 'GET',
					params: {
						register: true,
						deviceToken: token,
						key: personId,
						lang: 'en',
					},
				};
				yield call(request, options);
			} catch (error) {
				Sentry.captureException(error);
			}
		}
	} catch (error) {
		Sentry.captureException(error);
	}
}

// /action/sbGetNotifications?page=<default à 1>&perPage=<default à 20>&includeDeleted=<default à false>
// pattern de données est le même que d'hab avec un objet data dans la réponse contenant:
// "notifications": un array de notifications en ordre décroissant à partir de la date (Les plus récents en premier)
// "pager": Un object avec "currentPage", "pages", "total" et "perPage" comme propriétés

function* loadNotifications({ user, page = 1, isNotificationPage = false }) {
	const url = `${API()}/action/sbGetNotifications`;
	const personId = user?.personId;
	const options = {
		url,
		method: 'GET',
		params: {
			ajax: true,
			field1: 'notification',
			field7: personId,
			field8: false,
			page,
		},
	};

	try {
		const { data } = yield call(request, options);
		if (typeof (data) === 'string') {
			yield put(loadNotificationsFail(data));
		} else {
			const notifications = [];
			let responsesIds = [];
			let remindersIds = [];
			data.data.notifications.forEach((notification) => {
				const isDeleted = notification.field8 === 'true';
				const isNewResponse = notification.field3 === '0';
				const isNewReminder = notification.field3 === '1';
				const isNewUser = notification.field3 === '2';
				const isNewLocation = notification.field3 === '3';
				if (!isDeleted && !isNewUser && !isNewLocation) {
					notifications.push(notification);
				}
				if (isNewResponse) {
					responsesIds.push(notification.field5);
				}
				if (isNewReminder) {
					remindersIds.push(notification.field5);
				}
			});
			// First push the notifications to the store
			yield put(loadNotificationsSuccess(notifications));
			// If we're looking at the notification page only
			// Cause we we load a tons of stuff
			// i don't want it to be triggered everytime
			if (isNotificationPage) {
				// Then load the responses associated if there's one
				if (responsesIds.length > 0) {
					// They should be uniq already and the BE should take care of this anyway
					// but ... cost not much to just verify... so here we are
					responsesIds = _.uniq(responsesIds);
					yield put(loadResponsesByIds(responsesIds));
				}
				// and load the buttons associated with the reminder
				if (remindersIds.length > 0) {
					remindersIds = _.uniq(remindersIds);
					yield put(loadChecklist(null, remindersIds));
				}
			}
		}
	} catch (err) {
		yield put(loadNotificationsFail());
		Sentry.captureException(err);
	}
}

function* seenNotification({ id }) {
	const url = `${API()}/action/manageGenData`;
	const options = {
		url,
		method: 'GET',
		params: {
			ajax: true,
			id,
			field4: true,
		},
	};

	try {
		const { data } = yield call(request, options);
		seenNotificationSuccess(data);
	} catch (err) {
		yield put(seenNotificationFail(id));
		Sentry.captureException(err);
	}
}

function* deleteNotification({ id }) {
	const url = `${API()}/action/manageGenData`;
	const options = {
		url,
		method: 'GET',
		params: {
			ajax: true,
			id,
			field8: true,
		},
	};

	try {
		const { data } = yield call(request, options);
		deleteNotificationSuccess(data);
	} catch (err) {
		yield put(deleteNotificationFail(id));
		Sentry.captureException(err);
	}
}

export default function* NotificationsProviderSaga() {
	// See example in containers/HomePage/saga.js
	yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
	yield takeLatest(SUBSCRIBE_PUSH_NOTIFICATIONS, registerForPushNotifications);
	yield takeEvery(SEEN_NOTIFICATION, seenNotification);
	yield takeEvery(DELETE_NOTIFICATION, deleteNotification);
}

import {
	LOAD_NOTIFICATIONS,
	LOAD_NOTIFICATIONS_FAIL,
	LOAD_NOTIFICATIONS_SUCCESS,
	DELETE_NOTIFICATION,
	DELETE_NOTIFICATION_SUCCESS,
	DELETE_NOTIFICATION_FAIL,
	SEEN_NOTIFICATION,
	SEEN_NOTIFICATION_SUCCESS,
	SEEN_NOTIFICATION_FAIL,
	SUBSCRIBE_PUSH_NOTIFICATIONS,
	RESET_PAGE,
} from './constants';

export function subscribePushNotification(user) {
	return {
		type: SUBSCRIBE_PUSH_NOTIFICATIONS,
		user,
	};
}

export function loadNotifications(user, page, isNotificationPage) {
	return {
		type: LOAD_NOTIFICATIONS,
		user,
		page,
		isNotificationPage,
	};
}

export function resetPageNotification() {
	return {
		type: RESET_PAGE,
	};
}

export function loadNotificationsSuccess(notifications) {
	return {
		type: LOAD_NOTIFICATIONS_SUCCESS,
		notifications,
	};
}

export function loadNotificationsFail() {
	return {
		type: LOAD_NOTIFICATIONS_FAIL,
	};
}

export function deleteNotification(id) {
	return {
		type: DELETE_NOTIFICATION,
		id,
	};
}

export function deleteNotificationSuccess() {
	return {
		type: DELETE_NOTIFICATION_SUCCESS,
	};
}

export function deleteNotificationFail() {
	return {
		type: DELETE_NOTIFICATION_FAIL,
	};
}

export function seenNotification(id) {
	return {
		type: SEEN_NOTIFICATION,
		id,
	};
}

export function seenNotificationSuccess() {
	return {
		type: SEEN_NOTIFICATION_SUCCESS,
	};
}

export function seenNotificationFail(id) {
	return {
		type: SEEN_NOTIFICATION_FAIL,
		id,
	};
}

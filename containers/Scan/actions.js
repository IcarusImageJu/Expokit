import {
	SCANNING, PERMISSION, UNMOUNT, SET_LOCATION, CHECK_LOCATION, LOCATION_CHECKED_FAIL,
} from './constants';

export function scanning(data) {
	return {
		type: SCANNING,
		data,
	};
}

export function scanFail(err) {
	return {
		type: LOCATION_CHECKED_FAIL,
		err,
	};
}

export function permission(status) {
	return {
		type: PERMISSION,
		status,
	};
}

export function unmount() {
	return {
		type: UNMOUNT,
	};
}

export function setLocation(location) {
	return {
		type: SET_LOCATION,
		location,
	};
}

export function checkLocationWithData(data) {
	return {
		type: CHECK_LOCATION,
		data,
	};
}

export function locationCheckedSuccess(location) {
	return {
		type: CHECK_LOCATION,
		location,
	};
}

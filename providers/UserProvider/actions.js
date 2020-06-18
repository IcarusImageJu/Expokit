import moment from 'moment';
import he from 'he';
import {
	RESET,
	SET_USER,
	SUBMIT_USER,
	SUBMIT_USER_SUCCESS,
	SUBMIT_USER_FAIL,
	RESTORE_USER,
	CHANGE_INPUT,
} from './constants';

export function reset() {
	return {
		type: RESET,
	};
}

export function restoreUser() {
	return {
		type: RESTORE_USER,
	};
}

export function setUser(user, updated = true) {
	const updatedUser = { ...user, lastUpdated: moment() };
	if (updated) {
		updatedUser.lastUpdated = moment().subtract(2, 's');
	}

	return {
		type: SET_USER,
		user: updatedUser,
	};
}

export function submitUser(user) {
	const updatedUser = {
		...user,
		firstName: he.decode(user.firstName),
		lastName: he.decode(user.lastName),
		email: he.decode(user.email),
		phone: he.decode(user.phone),
		address: he.decode(user.address),
		city: he.decode(user.city),
		postalCode: he.decode(user.postalCode),
	};

	return {
		type: SUBMIT_USER,
		user: updatedUser,
	};
}

export function submitUserSuccess() {
	return {
		type: SUBMIT_USER_SUCCESS,
	};
}

export function submitUserFail() {
	return {
		type: SUBMIT_USER_FAIL,
	};
}

export function changeInput(value, name) {
	return {
		type: CHANGE_INPUT,
		value,
		name,
	};
}

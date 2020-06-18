import {
	LOAD_BUTTONS, BUTTONS_LOADED_SUCCESS, BUTTONS_LOADED_FAIL,
} from './constants';

export function loadButtons(location) {
	return {
		type: LOAD_BUTTONS,
		location,
	};
}

export function buttonsLoadedSuccess(buttons, locationId) {
	return {
		type: BUTTONS_LOADED_SUCCESS,
		buttons,
		locationId,
	};
}

export function buttonsLoadedFail(err) {
	return {
		type: BUTTONS_LOADED_FAIL,
		err,
	};
}

import { LOAD_LOCATIONS, LOCATIONS_LOADED_SUCCESS, LOCATIONS_LOADED_FAIL } from './constants';

export function loadLocations() {
	return {
		type: LOAD_LOCATIONS,
	};
}

export function locationsLoadedSuccess(locations) {
	return {
		type: LOCATIONS_LOADED_SUCCESS,
		locations,
	};
}

export function locationsLoadedFail(err) {
	return {
		type: LOCATIONS_LOADED_FAIL,
		err,
	};
}

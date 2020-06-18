import { RESET, CHANGE_INPUT } from './constants';

export function filtering(value, name, locations) {
	let filteredLocations = [];
	if (locations) {
		filteredLocations = locations
			.filter(
				(location) => (
					location.field2
						? location.field2
							.toUpperCase()
							.search(value.toUpperCase())
						: location.id
							.search(value.toUpperCase())
				) !== -1,
			);
	}

	return {
		type: CHANGE_INPUT,
		value,
		name,
		filteredLocations,
	};
}

export function reset() {
	return {
		type: RESET,
	};
}

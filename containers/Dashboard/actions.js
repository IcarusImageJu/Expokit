import { RESET, CHANGE_INPUT } from './constants';

export function reset() {
	return {
		type: RESET,
	};
}

export function changeInput(value, name) {
	return {
		type: CHANGE_INPUT,
		value,
		name,
	};
}

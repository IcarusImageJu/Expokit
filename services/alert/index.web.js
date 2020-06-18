/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

function alert(title, message, buttons, options) {
	const res = confirm(`${title}: ${message}`);
	if (res === true || !options?.cancelable) {
		return buttons?.[0]?.onPress();
	}
	return null;
}

export default { alert };

import {
	RESET,
	NFC_SUPPORT,
	NFC_ENABLED,
	MODAL,
	RESET_NFC,
	POLLING_NFC,
	HAVE_SEND_RESPONSE,
	SET_CURRENT,
} from './constants';

export function reset() {
	return {
		type: RESET,
	};
}

export function setNfcSupport(value) {
	return {
		type: NFC_SUPPORT,
		value,
	};
}

export function setNfcEnabled(value) {
	return {
		type: NFC_ENABLED,
		value,
	};
}

export function setModal(value) {
	return {
		type: MODAL,
		value,
	};
}

export function resetNfc() {
	return {
		type: RESET_NFC,
	};
}

export function pollingNfc() {
	return {
		type: POLLING_NFC,
	};
}

export function haveSendResponse() {
	return {
		type: HAVE_SEND_RESPONSE,
	};
}

export function setCurrent(current) {
	return {
		type: SET_CURRENT,
		current,
	};
}

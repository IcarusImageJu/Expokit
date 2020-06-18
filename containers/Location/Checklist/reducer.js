
import produce from 'immer';
import {
	RESET, MODAL, NFC_ENABLED, NFC_SUPPORT, RESET_NFC, POLLING_NFC, HAVE_SEND_RESPONSE, SET_CURRENT,
} from './constants';

// The initial state of the App
export const initialState = {
	loading: false,
	nfc: {
		supported: true,
		enabled: true,
		polling: 1,
	},
	modal: false,
	haveSendResponse: false,
	current: 0,
};

/* eslint-disable default-case, no-param-reassign */
const locationChecklistReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case NFC_SUPPORT:
			draft.nfc.supported = action.value;
			break;
		case NFC_ENABLED:
			draft.nfc.enabled = action.value;
			draft.nfc.supported = action.value || draft.nfc.supported;
			break;
		case MODAL:
			draft.modal = action.value;
			break;
		case RESET_NFC:
			draft.nfc.enabled = true;
			draft.nfc.supported = true;
			draft.nfc.polling = 1;
			break;
		case POLLING_NFC:
			draft.nfc.polling += draft.nfc.polling;
			break;
		case HAVE_SEND_RESPONSE:
			draft.haveSendResponse = true;
			break;
		case RESET:
			Object.keys(initialState).forEach((stateType) => {
				draft[stateType] = initialState[stateType];
			});
			break;
		case SET_CURRENT:
			draft.current = action.current;
			break;
	}
});

export default locationChecklistReducer;

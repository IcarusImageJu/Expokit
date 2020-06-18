import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import { Platform } from 'react-native';
import Sentry from '../sentry';
import Alert from '../alert';
import ENUM_TYPE_CHECKLIST from '../../constants/enumTypeChecklist';
import { t } from '../i18n';

// This function decode the message inside an NFC Tag
function decodeNdefRecord(record) {
	if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
		return ['text', Ndef.text.decodePayload(record.payload)];
	}
	if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
		return ['uri', Ndef.uri.decodePayload(record.payload)];
	}
	return ['unknown', '---'];
}

// This function redirect to the NFC settings of the Phone
// And will try to restart the NFC after 15sec with a polling call
async function activateNfc(cb) {
	try {
		await NfcManager.goToNfcSetting();
	} catch (error) {
		Sentry.captureException(error);
	}
	setTimeout(() => {
		cb();
	}, 15000);
}

// This function always wait for an NFC tag in order to listen to his event
async function listenTagEvent(questions, checklistId, handleSetQuestionNFC, cb = () => {}) {
	// This event listener listend to any NFC Event dispatched by listenTagEvent();
	NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
		// Decode the NFC Message
		let parsed = null;
		const ndefRecords = tag.ndefMessage;
		if (ndefRecords && ndefRecords.length > 0) {
			parsed = ndefRecords.map(decodeNdefRecord);
		}
		// Take ONLY the first message if there's one
		const NFCRead = parsed ? parsed[0][1] : '---';
		// Check if message match with an NFC Tag in questions
		const NFCQuestion = questions.find((question) => {
			if (question.NFCValidation && question.NFCTag) {
				for (let index = 0; index < question.NFCData.length; index += 1) {
					const tagCode = question.NFCData[index];
					if (tagCode.toString() === NFCRead.toString()) {
						return true;
					}
				}
			}
			return false;
		});
		if (NFCQuestion) {
			// If it match set the NFC response to true for this question
			// And give a UX Feedback => Vibrate
			handleSetQuestionNFC(true, NFCQuestion.i, checklistId);
			cb();
			// Remove vibration because i need to add the permission for it
			// Vibration.vibrate(500);
			if (Platform.OS === 'ios') {
				NfcManager.unregisterTagEvent().catch(() => 0);
			}
		} else {
			// If it doesnt match, send an alert to the user
			Alert.alert(
				t('nfcNoMatchTitle'), t('nfcNoMatchMessage'),
			);
		}
	});

	try {
		await NfcManager.registerTagEvent();
	} catch (ex) {
		Sentry.captureException(ex);
		NfcManager.unregisterTagEvent().catch(() => 0);
	}
}

// This function start the NFC functionality
async function startNfc(
	questions,
	location,
	handleSetNfcSupport,
	handleSetNfcEnabled,
	checklistId,
	handleSetQuestionNFC,
) {
	// Check if at least one question need NFC in order to be completed
	let requireNFC = false;
	questions.forEach(({ NFCValidation }) => {
		if (NFCValidation) {
			requireNFC = true;
		}
	});
	// Only start it if we're trying to Create or Update a response to a checklist
	// And at least one question is asking for NFC
	if ((location.state.type === ENUM_TYPE_CHECKLIST.CREATE || location.state.type === ENUM_TYPE_CHECKLIST.UPDATE) && requireNFC) {
		// Check if NFC is supported on this device
		let NfcManagerIsSupported = false;
		try {
			NfcManagerIsSupported = await NfcManager.isSupported();
		} catch (error) {
			console.warn(error);
		}
		if (NfcManagerIsSupported) {
			// Set the NFC Support
			handleSetNfcSupport(true);
			try {
				// Start NFC
				await NfcManager.start();
			} catch (err) {
				Sentry.captureException(err);
			}
			// Check if NFC is enabled
			let NfcManagerIsEnabled = false;
			try {
				NfcManagerIsEnabled = Platform.OS === 'ios' ? true : await NfcManager.isEnabled();
			} catch (error) {
				console.warn(error);
			}
			if (NfcManagerIsEnabled) {
				// Set NFC Enabled
				handleSetNfcEnabled(true);
				if (Platform.OS === 'android') {
					listenTagEvent(questions, checklistId, handleSetQuestionNFC);
				}
			} else {
				// Set NFC disabled
				handleSetNfcEnabled(false);
			}
		} else {
			// Set the NFC Support
			handleSetNfcSupport(false);
		}
	}
}

export {
	decodeNdefRecord,
	activateNfc,
	startNfc,
	listenTagEvent,
};

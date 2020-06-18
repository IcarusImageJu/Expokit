import React, { useEffect, memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
	View, KeyboardAvoidingView,
} from 'react-native';
import { useHistory, useLocation, useParams } from 'react-router-native';
import posed from 'react-native-pose';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Sentry from '../../../services/sentry';
import ButtonHeader from '../../../components/ButtonHeader';
import { t } from '../../../services/i18n';
import Content from '../../../components/Content/Content';
import Control from '../../../components/Control';
import ChecklistCard from '../../../components/ChecklistCard';
import styles from './styles';
import ENUM_TYPE_CHECKLIST from '../../../constants/enumTypeChecklist';
import ModalSaveExit from './ModalSaveExit';
import { useInjectReducer } from '../../../utils/injectReducer'; /* eslint-disable-line */
import reducer from './reducer';
import makeSelectLocationChecklist from './selectors';
import {
	setModal,
	setNfcSupport,
	setNfcEnabled,
	resetNfc,
	pollingNfc,
	reset,
	haveSendResponse,
	setCurrent,
} from './actions';
import {
	makeSelectChecklists,
	makeSelectChecklistsInProgress,
	makeSelectChecklistsLoadingSendResponse,
	makeSelectResponses,
} from '../../../providers/ChecklistProvider/selectors';
import {
	setQuestionDeficiency,
	setQuestionResponse,
	setQuestionNFC,
	setQuestionPic,
	setQuestionNfcValidation,
	sendResponse,
	deleteQuestionNfc,
	addQuestionNfc,
	editQuestionNfc,
} from '../../../providers/ChecklistProvider/actions';
import DescriptionRead from './DescriptionRead';
import Alert from '../../../services/alert';
import {
	activateNfc,
	startNfc,
	listenTagEvent,
} from '../../../services/nfc';

// Animation node
// This one only add a stagger effect to his children
const AnimParent = posed.View({
	enter: { staggerChildren: 50, delayChildren: 50 },
});
// This on add a vertical animation and opacity, the trigger is controlled by the parent
const AnimItem = posed.View({
	enter: { y: 0, opacity: 1 },
	exit: { y: 100, opacity: 0 },
});
// Key for the reducer of this page
const key = 'locationchecklist';

function Checklist({
	loading,
	checklist,
	handleSetModal,
	handleSetNfcEnabled,
	handlePollingNfc,
	handleSetNfcSupport,
	handleResetNfc,
	handleReset,
	checklists,
	inProgress,
	handleSetQuestionDeficiency,
	handleSetQuestionResponse,
	handleSetQuestionNFC,
	handleSetQuestionPic,
	handleSetQuestionNfcValidation,
	handleSendResponse,
	handleHaveSendResponse,
	responses,
	handleDeleteQuestionNfc,
	handleAddQuestionNfc,
	handleEditQuestionNfc,
	handleSetCurrent,
}) {
	// Inject the reducer of this page
	useInjectReducer({ key, reducer });
	// Use the history, location and params from the router component
	const history = useHistory();
	const location = useLocation();
	const { checklistId, responseId } = useParams();
	// Select current checklist
	const currentChecklist = checklists.find((el) => Number(el.id) === Number(checklistId));
	// Select current in progress
	// In progress only have the response of the current Checklist
	// Can be null if we don't have started to respond the current checklist
	let currentInProgress = null;
	if (inProgress.length > 0) {
		currentInProgress = inProgress.find((el) => Number(el.checklist) === Number(checklistId));
	}
	// Add an helper to know if this checklist have already been started
	const isInProgress = !!currentInProgress || false;
	// build question array
	const { questions: rawQuestions } = JSON.parse(currentChecklist.field8);
	let questions = [];
	rawQuestions.forEach((question, i) => {
		questions.push({ ...question, i, key: `${i}${question.name}` });
	});

	// If it's type read, then create the
	let currentResponse = {};
	if (responseId && location.state.type === ENUM_TYPE_CHECKLIST.READ) {
		questions = [];
		currentResponse = responses.find((response) => Number(response?.id ?? -1) === Number(responseId));
		const responsesParse = JSON.parse(currentResponse?.field3)?.questions ?? [];
		responsesParse.forEach((response, i) => {
			questions.push({ ...response, i, key: `${i}${response.name}` });
		});
	}

	// This effect listen to the NFC support change
	useEffect(() => {
		// If the NFC is not supported
		// Send the user back to the previous screen
		if (!checklist.nfc.supported) {
			Alert.alert(
				t('nfcErrorTitle'), t('nfcErrorMessage'),
				[
					{ text: t('Cancel'), onPress: history.goBack },
				],
				{ cancelable: false },
			);
		}
	}, [checklist.nfc.supported]);

	// This effect listen to the polling NFC and the NFC Enaled change
	useEffect(() => {
		// If the NFC is not enabled
		// Propose the user to active his NFC
		// Or send him back to the previous screen
		if (!checklist.nfc.enabled) {
			Alert.alert(
				t('nfcErrorEnableTitle'), t('nfcErrorEnableMessage'),
				[
					{ text: t('Activate'), onPress: () => activateNfc(handlePollingNfc) },
					{ text: t('Cancel'), onPress: history.goBack },
				],
				{ cancelable: false },
			);
		} else if (checklist.nfc.enabled && checklist.nfc.polling > 1) {
			// If the NFC is enabled,
			// but we're already reaching this point because of a poll action
			// Try to start the NFC
			startNfc(questions, location, handleSetNfcSupport, handleSetNfcEnabled, checklistId, handleSetQuestionNFC);
		}
		return () => {
			// When this page is leaved, reset the whole NFC process
			handleResetNfc();
		};
	}, [checklist.nfc.enabled, checklist.nfc.polling]);
	// This effect is trigger by a change in the checklistId
	useEffect(() => {
		// Try to start the NFC on load of this page
		startNfc(questions, location, handleSetNfcSupport, handleSetNfcEnabled, checklistId, handleSetQuestionNFC);
		// Log to sentry the current checklist name, in order to facilitate the debug
		Sentry.addBreadcrumb({
			category: 'Button',
			message: currentChecklist?.field2,
			level: Sentry.Severity.Info,
		});
		return () => {
			// When leaving this page
			// Remove any NFC listener
			NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
			NfcManager.unregisterTagEvent().catch(() => 0);
			// Reset the whole datas
			handleReset();
		};
	}, [checklistId]);
	// This effect print a success to the user when he have succesfully submited a response
	useEffect(() => {
		if (!currentInProgress && checklist.haveSendResponse) {
			Alert.alert(
				t('checklistSendSuccessTitle'), t('checklistSendSuccessMessage'),
				[
					{ text: t('OK'), onPress: history.goBack },
				],
				{ cancelable: false },
			);
		}
	}, [currentInProgress, checklist.haveSendResponse]);

	useEffect(() => {
		if (loading.error) {
			Alert.alert(
				t('newPasswordServerErrorTitle'), t('newPasswordServerErrorMessage'),
				[
					{ text: t('OK'), onPress: history.goBack },
				],
			);
		}
	}, [loading.error]);

	useEffect(() => {
		// Reset current selected card to 0 when arriving on the page
		handleSetCurrent(0);
		// Reset current selected card to 0 when leaving the page... just in case :D
		return () => {
			handleSetCurrent(0);
		};
	}, []);
	function isQuestionCompleted(question) {
		const { NFCValidation, responseType, i } = question;
		const NFCStored = currentInProgress?.[`question${i}nfc`] ?? false;
		if (NFCValidation) {
			if (!NFCStored) {
				return false;
			}
		}

		let toggly = null;
		let text = '';
		switch (responseType) {
			case 'text':
				text = currentInProgress?.[`question${i}`] ?? '';
				if (text === '') {
					return false;
				}
				break;
			case 'confirm':
				toggly = currentInProgress?.[`question${i}`] ?? null;
				if (toggly === null) {
					return false;
				}
				break;
			case 'yes-no':
				toggly = currentInProgress?.[`question${i}`] ?? null;
				if (toggly === null) {
					return false;
				}
				break;
			default:
				break;
		}

		return true;
	}
	// Listen to the currentInProgress change to check the active question
	useEffect(() => {
		for (let index = 0; index < questions.length; index += 1) {
			const question = questions[index];
			if (!isQuestionCompleted(question)) {
				handleSetCurrent(index);
				break;
			}
		}
	}, [currentInProgress]);

	// This function take care of generating Question Card
	function generateQuestion(question) {
		// take what we need from the question
		const { responseType, key: itemKey, i } = question;
		// Declare response content
		const deficiencyMessage = currentInProgress?.[`question${question.i}deficiency`] ?? '';
		const deficiency = currentInProgress?.[`question${question.i}activeDeficiency`] ?? false;
		let toggly = null;
		let text = '';
		switch (responseType) {
			case 'text':
				text = currentInProgress?.[`question${question.i}`] ?? '';
				break;
			case 'confirm':
				toggly = currentInProgress?.[`question${question.i}`] ?? null;
				break;
			case 'yes-no':
				toggly = currentInProgress?.[`question${question.i}`] ?? null;
				break;
			default:
				break;
		}
		// Return the node
		return (
			<AnimItem key={itemKey}>
				<ChecklistCard
					question={question}
					nfc={currentInProgress?.[`question${question.i}nfc`] ?? false}
					nfcTapped={() => listenTagEvent(questions, checklistId, handleSetQuestionNFC)}
					deficiency={deficiency}
					setDeficiency={(active) => handleSetQuestionDeficiency(active, deficiencyMessage, i, checklistId)}
					toggly={toggly}
					setToggly={(value) => handleSetQuestionResponse(responseType === 'confirm' ? (value || null) : value, responseType, i, checklistId)}
					image={currentInProgress?.[`question${question.i}pic`] ?? false}
					setImage={(pic) => handleSetQuestionPic(pic, i, checklistId)}
					text={text}
					setText={(value) => handleSetQuestionResponse(value, responseType, i, checklistId)}
					deficiencyMessage={deficiencyMessage}
					setDeficiencyMessage={(value) => handleSetQuestionDeficiency(deficiency, value, i, checklistId)}
					setNfcValidation={(value) => handleSetQuestionNfcValidation(value, i, currentChecklist)}
					addNfc={(title, data) => handleAddQuestionNfc(title, data, i, currentChecklist)}
					editNfc={(title, data, nfcIndex) => handleEditQuestionNfc(title, data, nfcIndex, i, currentChecklist)}
					deleteNfc={(value) => handleDeleteQuestionNfc(value, i, currentChecklist)}
					current={checklist.current === i}
				/>
			</AnimItem>
		);
	}
	// This function look for any question not completly satisfied
	function formValidation() {
		// Assume that the form is valid until we prove it's not
		let formIsValid = true;
		// Loop over every question
		questions.forEach(({ NFCValidation, i }) => {
			// Declars vars with the possibility that we haven't started to respond to any question yet
			const haveInProgressNFC = isInProgress ? !!currentInProgress[`question${i}nfc`] : false;
			let haveResponse = false;
			if (isInProgress) {
				switch (typeof currentInProgress?.[`question${i}`]) {
					case 'boolean':
						haveResponse = true;
						break;
					case 'string':
						if (currentInProgress?.[`question${i}`].length > 0) {
							haveResponse = true;
						}
						break;
					default:
						break;
				}
			}

			// Verify that this question is asking for NFC and that we already have scanned the NFC
			if (NFCValidation && !haveInProgressNFC) {
				Alert.alert(t('missingNFCValidationTitle'), t('missingNFCValidationMessage', { number: i + 1 }));
				formIsValid = false;
			}
			// Verify that we have a response for this question
			if (!haveResponse) {
				Alert.alert(t('missingResponseValidationTitle'), t('missingResponseValidationMessage', { number: i + 1 }));
				formIsValid = false;
			}
		});
		// If after the check the form is still valid
		if (formIsValid) {
			// Tell that we have tried to send the response
			handleHaveSendResponse();
			// Send it
			handleSendResponse(currentInProgress);
		}
	}

	return (
		<KeyboardAvoidingView behavior="position">
			<ScrollView contentContainerStyle={styles.scrollInner}>
				<ButtonHeader
					title={t('Checklist')}
					context={currentChecklist.field2}
					icon="md-pin"
				/>
				{location.state.type === ENUM_TYPE_CHECKLIST.READ && (
					<DescriptionRead currentResponse={currentResponse} />
				)}
				<Content noPaddingHorizontal>
					<AnimParent initialPose="exit" pose="enter">
						{questions.map((question) => generateQuestion(question))}
						<AnimItem>
							{(location.state.type === ENUM_TYPE_CHECKLIST.READ || location.state.type === ENUM_TYPE_CHECKLIST.VIEW) && (
								<View style={styles.controls}>
									<Control theme="alt" onPress={history.goBack} title={t('Back to checklist')} />
								</View>
							)}
							{(location.state.type === ENUM_TYPE_CHECKLIST.CREATE || location.state.type === ENUM_TYPE_CHECKLIST.UPDATE) && (
								<View style={styles.controls}>
									<Control theme="alt" onPress={() => handleSetModal(true)} title={t('Save and exit')} />
									<Control loading={loading.loading} onPress={formValidation} title={t('Submit')} />
								</View>
							)}
						</AnimItem>
					</AnimParent>
				</Content>
			</ScrollView>
			<ModalSaveExit isVisible={checklist.modal} onHide={() => handleSetModal(false)} />
		</KeyboardAvoidingView>
	);
}

const mapStateToProps = createStructuredSelector({
	checklist: makeSelectLocationChecklist(),
	checklists: makeSelectChecklists(),
	inProgress: makeSelectChecklistsInProgress(),
	loading: makeSelectChecklistsLoadingSendResponse(),
	responses: makeSelectResponses(),
});

export function mapDisptachToProps(dispatch) {
	return {
		handleSetModal: (value) => dispatch(setModal(value)),
		handleSetNfcSupport: (value) => dispatch(setNfcSupport(value)),
		handleSetNfcEnabled: (value) => dispatch(setNfcEnabled(value)),
		handleResetNfc: () => dispatch(resetNfc()),
		handleReset: () => dispatch(reset()),
		handlePollingNfc: () => dispatch(pollingNfc()),
		handleSetQuestionDeficiency: (active, message, questionIndex, checklistId) => dispatch(setQuestionDeficiency(active, message, questionIndex, checklistId)),
		handleSetQuestionResponse: (response, responseType, questionIndex, checklistId) => dispatch(setQuestionResponse(response, responseType, questionIndex, checklistId)),
		handleSetQuestionNFC: (value, questionIndex, checklistId) => dispatch(setQuestionNFC(value, questionIndex, checklistId)),
		handleSetQuestionPic: (pic, questionIndex, checklistId) => dispatch(setQuestionPic(pic, questionIndex, checklistId)),
		handleSendResponse: (response) => dispatch(sendResponse(response)),
		handleHaveSendResponse: () => dispatch(haveSendResponse()),
		handleSetQuestionNfcValidation: (value, questionIndex, checklist) => dispatch(setQuestionNfcValidation(value, questionIndex, checklist)),
		handleDeleteQuestionNfc: (value, questionIndex, checklist) => dispatch(deleteQuestionNfc(value, questionIndex, checklist)),
		handleAddQuestionNfc: (title, data, questionIndex, checklist) => dispatch(addQuestionNfc(title, data, questionIndex, checklist)),
		handleEditQuestionNfc: (title, data, nfcIndex, questionIndex, checklist) => dispatch(editQuestionNfc(title, data, nfcIndex, questionIndex, checklist)),
		handleSetCurrent: (current) => dispatch(setCurrent(current)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDisptachToProps,
);

export default compose(memo, withConnect)(Checklist);

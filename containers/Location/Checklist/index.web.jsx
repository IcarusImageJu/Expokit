import React, { useEffect, memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
	View, KeyboardAvoidingView,
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Alert from '../../../services/alert';
import { useHistory, useLocation, useParams } from '../../../services/router';
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
	sendResponse,
} from '../../../providers/ChecklistProvider/actions';
import DescriptionRead from './DescriptionRead';

// Key for the reducer of this page
const key = 'locationchecklist';

function Checklist({
	loading,
	checklist,
	handleSetModal,
	handleReset,
	checklists,
	inProgress,
	handleSetQuestionDeficiency,
	handleSetQuestionResponse,
	handleSetQuestionNFC,
	handleSetQuestionPic,
	handleSendResponse,
	handleHaveSendResponse,
	responses,
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
	// This function always wait for an NFC tag in order to listen to his event
	async function listenTagEvent(NFCRead) {
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
		} else {
			// If it doesnt match, send an alert to the user
			Alert.alert(
				t('nfcNoMatchTitle'), t('nfcNoMatchMessage'),
			);
		}
	}

	// This effect is trigger by a change in the checklistId
	useEffect(() => {
		// Log to sentry the current checklist name, in order to facilitate the debug
		Sentry.addBreadcrumb({
			category: 'Button',
			message: currentChecklist?.field2,
			level: Sentry.Severity.Info,
		});
		return () => {
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
			<ChecklistCard
				key={itemKey}
				question={question}
				nfc={currentInProgress?.[`question${question.i}nfc`] ?? false}
				setNfc={listenTagEvent}
				nfcTapped={listenTagEvent}
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
				current={checklist.current === i}
			/>
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
			const haveResponse = isInProgress ? (typeof currentInProgress?.[`question${i}`] === 'boolean' || typeof currentInProgress?.[`question${i}`] === 'string') : false;
			// Verify that this question is asking for NFC and that we already have scanned the NFC
			if (NFCValidation && !haveInProgressNFC) {
				Alert.alert(
					t('missingNFCValidationTitle'),
					`You have to scan the NFC Tag required in: Question ${i + 1}`,
				);
				formIsValid = false;
			}
			// Verify that we have a response for this question
			if (!haveResponse) {
				Alert.alert(
					t('missingResponseValidationTitle'),
					`You have to give your response in: Question ${i + 1}`,
				);
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
				{location.state?.type === ENUM_TYPE_CHECKLIST.READ && (
					<DescriptionRead currentResponse={currentResponse} />
				)}
				<Content noPaddingHorizontal>
					{questions.map((question) => generateQuestion(question))}

					{(location.state?.type === ENUM_TYPE_CHECKLIST.READ || location.state?.type === ENUM_TYPE_CHECKLIST.VIEW) && (
						<View style={styles.controls}>
							<Control theme="alt" onPress={history.goBack} title={t('Back to checklist')} />
						</View>
					)}
					{(location.state?.type === ENUM_TYPE_CHECKLIST.CREATE || location.state?.type === ENUM_TYPE_CHECKLIST.UPDATE) && (
						<View style={styles.controls}>
							<Control theme="alt" onPress={() => handleSetModal(true)} title={t('Save and exit')} />
							<Control loading={loading.loading} onPress={formValidation} title={t('Submit')} />
						</View>
					)}
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
		handleSetCurrent: (current) => dispatch(setCurrent(current)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDisptachToProps,
);

export default compose(memo, withConnect)(Checklist);

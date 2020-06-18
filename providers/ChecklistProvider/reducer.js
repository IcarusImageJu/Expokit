import produce from 'immer';
import _ from 'lodash';
import moment from 'moment';
import {
	LOAD_CHECKLIST,
	CHECKLIST_LOADED_SUCCESS,
	CHECKLIST_LOADED_FAIL,
	DELETE_CURRENT_IN_PROGRESS,
	SET_QUESTION_RESPONSE,
	SET_QUESTION_PIC,
	SET_QUESTION_NFC,
	SET_QUESTION_DEFICIENCY,
	SET_QUESTION_NFC_VALIDATION,
	SEND_RESPONSE,
	SEND_RESPONSE_SUCCESS,
	SEND_RESPONSE_FAIL,
	LOAD_RESPONSES_SUCCESS,
	LOAD_RESPONSES_FAIL,
	RESET_LOADING,
	DELETE_QUESTION_NFC,
	ADD_QUESTION_NFC,
	ADD_QUESTION_NFC_SUCCESS,
	EDIT_QUESTION_NFC,
} from './constants';

export const initialState = {
	loading: true,
	checklists: [],
	responses: [],
	loadingResponses: false,
	inProgress: [],
	loadingSendResponse: {
		loading: false,
		error: null,
	},
};

/* eslint-disable default-case, no-param-reassign */
const checklistsProviderReducer = (state = initialState, action) => produce(state, (draft) => {
	switch (action.type) {
		case LOAD_CHECKLIST:
			draft.loading = true;
			draft.loadingResponses = true;
			break;
		case CHECKLIST_LOADED_SUCCESS:
			draft.checklists = _.uniqBy([...action.checklist, ...draft.checklists], 'id');
			draft.loading = false;
			draft.loadingSendResponse.loading = false;
			draft.loadingSendResponse.error = null;
			break;
		case CHECKLIST_LOADED_FAIL:
			draft.loading = false;
			break;
		case RESET_LOADING:
			draft.loading = false;
			break;
		case DELETE_CURRENT_IN_PROGRESS:
			draft.loadingSendResponse.loading = false;
			draft.loadingSendResponse.error = null;
			draft.inProgress = _.remove(draft.inProgress, { checklist: action.checklist });
			break;
		case SET_QUESTION_RESPONSE: {
			let inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			if (inProgressIndex === -1) {
				draft.inProgress.push({ checklist: action.checklistId });
				inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			}
			draft.inProgress[inProgressIndex][`question${action.questionIndex}`] = action.response;
			draft.inProgress[inProgressIndex][`question${action.questionIndex}responseType`] = action.responseType;
			draft.inProgress[inProgressIndex][`question${action.questionIndex}date`] = +moment();
			break;
		}
		case SET_QUESTION_NFC: {
			let inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			if (inProgressIndex === -1) {
				draft.inProgress.push({ checklist: action.checklistId });
				inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			}
			draft.inProgress[inProgressIndex][`question${action.questionIndex}nfc`] = action.value;
			draft.inProgress[inProgressIndex][`question${action.questionIndex}date`] = +moment();
			break;
		}
		case SET_QUESTION_NFC_VALIDATION: {
			const checklistIndex = _.findIndex(draft.checklists, { id: action.checklist.id });
			const checklist = draft.checklists[checklistIndex];
			const { questions } = JSON.parse(checklist.field8);
			const question = questions[action.questionIndex];
			question.NFCValidation = action.value;
			question.NFCTitle = question?.NFCTitle ?? [];
			question.NFCData = question?.NFCData ?? [];
			questions[action.questionIndex] = question;
			const field8 = JSON.stringify({ questions });
			checklist.field8 = field8;
			break;
		}
		case DELETE_QUESTION_NFC: {
			const checklistIndex = _.findIndex(draft.checklists, { id: action.checklist.id });
			const checklist = draft.checklists[checklistIndex];
			const { questions } = JSON.parse(checklist.field8);
			const question = questions[action.questionIndex];
			question.NFCTitle = question?.NFCTitle ?? [];
			question.NFCData = question?.NFCData ?? [];
			let NFCTag = question.NFCTag.split(',');
			_.pullAt(NFCTag, [Number(action.value)]);
			NFCTag = NFCTag.join(',');
			question.NFCTag = NFCTag;
			_.pullAt(question.NFCTitle, [Number(action.value)]);
			_.pullAt(question.NFCData, [Number(action.value)]);
			questions[action.questionIndex] = question;
			const field8 = JSON.stringify({ questions });
			checklist.field8 = field8;
			break;
		}
		case ADD_QUESTION_NFC: {
			const checklistIndex = _.findIndex(draft.checklists, { id: action.checklist.id });
			const checklist = draft.checklists[checklistIndex];
			const { questions } = JSON.parse(checklist.field8);
			const question = questions[action.questionIndex];
			question.NFCTitle = question?.NFCTitle ?? [];
			question.NFCData = question?.NFCData ?? [];
			question.NFCTitle = [...question.NFCTitle, action.title];
			question.NFCData = [...question.NFCData, action.data];
			questions[action.questionIndex] = question;
			const field8 = JSON.stringify({ questions });
			checklist.field8 = field8;
			break;
		}
		case ADD_QUESTION_NFC_SUCCESS: {
			const checklistIndex = _.findIndex(draft.checklists, { id: action.checklist.id });
			const checklist = draft.checklists[checklistIndex];
			const { questions } = JSON.parse(checklist.field8);
			const question = questions[action.questionIndex];
			question.NFCTag = question.NFCTag ? `${question.NFCTag},${action.id}` : String(action.id);
			questions[action.questionIndex] = question;
			const field8 = JSON.stringify({ questions });
			checklist.field8 = field8;
			break;
		}
		case EDIT_QUESTION_NFC: {
			const checklistIndex = _.findIndex(draft.checklists, { id: action.checklist.id });
			const checklist = draft.checklists[checklistIndex];
			const { questions } = JSON.parse(checklist.field8);
			const question = questions[action.questionIndex];
			question.NFCTitle[action.nfcIndex] = action.title;
			question.NFCData[action.nfcIndex] = action.data;
			questions[action.questionIndex] = question;
			const field8 = JSON.stringify({ questions });
			checklist.field8 = field8;
			break;
		}
		case SET_QUESTION_DEFICIENCY: {
			let inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			if (inProgressIndex === -1) {
				draft.inProgress.push({ checklist: action.checklistId });
				inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			}
			draft.inProgress[inProgressIndex][`question${action.questionIndex}deficiency`] = action.message;
			draft.inProgress[inProgressIndex][`question${action.questionIndex}activeDeficiency`] = action.active;
			draft.inProgress[inProgressIndex][`question${action.questionIndex}date`] = +moment();
			break;
		}
		case SET_QUESTION_PIC: {
			let inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			if (inProgressIndex === -1) {
				draft.inProgress.push({ checklist: action.checklistId });
				inProgressIndex = _.findIndex(draft.inProgress, { checklist: action.checklistId });
			}
			draft.inProgress[inProgressIndex][`question${action.questionIndex}pic`] = action.pic;
			draft.inProgress[inProgressIndex][`question${action.questionIndex}date`] = +moment();
			break;
		}
		case SEND_RESPONSE:
			draft.loadingSendResponse.loading = true;
			draft.loadingSendResponse.error = null;
			break;
		case SEND_RESPONSE_SUCCESS:
			draft.loadingSendResponse.loading = false;
			draft.loadingSendResponse.error = null;
			draft.inProgress = _.remove(draft.inProgress, { checklist: action.checklist });
			break;
		case SEND_RESPONSE_FAIL:
			draft.loadingSendResponse.loading = false;
			draft.loadingSendResponse.error = true;
			break;
		case LOAD_RESPONSES_SUCCESS:
			draft.responses = _
				.uniqBy([...action.responses, ...draft.responses], 'id')
				.sort((a, b) => (
					moment(a.dateField1).diff(moment(b.dateField1))
				));
			draft.loadingResponses = false;
			break;
		case LOAD_RESPONSES_FAIL:
			draft.loadingResponses = false;
			break;
	}
});

export default checklistsProviderReducer;

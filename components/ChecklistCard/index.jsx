import React from 'react';
import { useLocation } from '../../services/router';
import ENUM_TYPE_CHECKLIST from '../../constants/enumTypeChecklist';
import ChecklistCardEdit from './ChecklistCardEdit';
import ChecklistCardRead from './ChecklistCardRead'; /* eslint-disable-line */
import ChecklistCardView from './ChecklistCardView';

function ChecklistCard({
	nfc,
	setNfc,
	nfcTapped,
	deficiency,
	setDeficiency,
	deficiencyMessage,
	setDeficiencyMessage,
	toggly,
	setToggly,
	image,
	setImage,
	text,
	setText,
	question,
	setNfcValidation,
	deleteNfc,
	addNfc,
	editNfc,
	current,
}) {
	const location = useLocation();
	const { state } = location;
	if (state?.type === ENUM_TYPE_CHECKLIST.UPDATE || state?.type === ENUM_TYPE_CHECKLIST.CREATE) {
		return (
			<ChecklistCardEdit
				question={question}
				nfc={nfc}
				nfcTapped={nfcTapped}
				setImage={setImage}
				setDeficiency={setDeficiency}
				setToggly={setToggly}
				deficiency={deficiency}
				toggly={toggly}
				image={image}
				text={text}
				setText={setText}
				deficiencyMessage={deficiencyMessage}
				setDeficiencyMessage={setDeficiencyMessage}
				setNfc={setNfc}
				current={current}
			/>
		);
	}
	if (state?.type === ENUM_TYPE_CHECKLIST.READ) {
		return <ChecklistCardRead question={question} />;
	}
	return (
		<ChecklistCardView
			question={question}
			setNfcValidation={setNfcValidation}
			deleteNfc={deleteNfc}
			addNfc={addNfc}
			editNfc={editNfc}
		/>
	);
}

export default ChecklistCard;

import React, { useState, useEffect } from 'react';
import {
	View, Text, Platform,
} from 'react-native';

import Alert from '../../services/alert';
import Paragraph from '../Content/Paragraph';
import SubTitle from '../Content/SubTitle';
import Control from '../Control';
import { t } from '../../services/i18n';
import styles from './styles';
import Switch from '../Form/Switch';
import ToggleBool from '../ToggleBool';
import TextArea from '../Form/TextArea';
import ModalTakePicture from './ModalTakePicture';
import ModalNfcInput from './ModalNfcInput';

function ChecklistCardEdit({
	nfc,
	setNfc,
	nfcTapped,
	deficiency,
	setDeficiency,
	deficiencyMessage = '',
	setDeficiencyMessage,
	toggly,
	setToggly,
	image,
	setImage,
	removeImage,
	text,
	setText,
	question,
	current,
}) {
	const [modal, setModal] = useState(false);
	const [modalNfc, setModalNfc] = useState(false);

	function tapNfc() {
		if (Platform.OS === 'web') {
			if (nfc) {
				setModalNfc(false);
			} else {
				setModalNfc(true);
			}
		} else if (Platform.OS === 'ios') {
			nfcTapped();
		} else if (nfc) {
			Alert.alert(t('explainNfcDoneTitle'), t('explainNfcDoneMessage'));
		} else {
			Alert.alert(t('explainNfcTitle'), t('explainNfcMessage'));
		}
	}

	useEffect(() => {
		if (Platform.OS === 'web' && nfc) {
			setModalNfc(false);
		}
	}, [nfc]);

	return (
		<>
			<View style={[styles.card, current && styles.cardCurrent]}>
				<View style={styles.cardHeader}>
					<Text style={styles.title}>{`Question ${question.i + 1}`}</Text>
					{(question.responseType === 'confirm' || question.responseType === 'yes-no') && (
						<ToggleBool
							radio={question.responseType === 'confirm'}
							value={toggly}
							onPress={setToggly}
						/>
					)}
				</View>
				<Text style={styles.subTitle}>{question.name}</Text>
				<Paragraph>{question.description}</Paragraph>
				{question.responseType === 'text' && <TextArea value={text} onChangeText={setText} noShadow /> }
				{question.pictureOption && (
					<Control
						onPress={() => setModal(true)}
						small
						theme={image ? 'success' : 'altLight'}
						title={image ? t('View picture') : t('Take a picture')}
					/>
				)}
				{question.NFCValidation && (
					<Control
						small
						theme={nfc ? 'success' : 'altLight'}
						onPress={tapNfc}
						title={`NFC Tag (${question.NFCTitle})`}
					/>
				)}
				<Switch
					value={deficiency}
					onValueChange={() => setDeficiency(deficiency ? !deficiency : true)}
					label={t('Urgent notification')}
				/>
				{deficiency && (
					<>
						<SubTitle title={t('Explain')} />
						<TextArea value={deficiencyMessage} onChangeText={setDeficiencyMessage} noShadow />
					</>
				)}
			</View>
			{question.pictureOption && (
				<ModalTakePicture
					isVisible={modal}
					onHide={() => setModal(false)}
					image={image}
					onChooseImage={(pic) => setImage(pic)}
					removeImage={removeImage}
					relaunch={() => {
						setModal(false); setTimeout(() => {
							setModal(true);
						}, 500);
					}}
				/>
			)}
			{Platform.OS === 'web' && question.NFCValidation && (
				<ModalNfcInput
					isVisible={modalNfc}
					onHide={() => setModalNfc(false)}
					question={question}
					onChooseNfc={setNfc}
				/>
			)}
		</>
	);
}

export default ChecklistCardEdit;

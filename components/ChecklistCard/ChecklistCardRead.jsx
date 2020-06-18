/* eslint-disable no-alert, no-console */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Paragraph from '../Content/Paragraph';
import SubTitle from '../Content/SubTitle';
import { t } from '../../services/i18n';
import styles from './styles';
import ToggleBool from '../ToggleBool';
import ModalRead from './ModalRead';

function ChecklistCardRead({ question }) {
	const [modal, setModal] = useState(false);

	return (
		<>
			<View style={[styles.card, question?.deficiency && styles.cardUrgent]}>
				{!!question?.deficiency && (
					<View style={styles.urgentPill}>
						<Ionicons name="md-warning" style={styles.urgentIcon} />
						<Text style={styles.urgentText}>{t('Urgent')}</Text>
					</View>
				)}
				<View style={styles.cardHeader}>
					<Text style={styles.title}>{`Question ${question.i + 1}`}</Text>
					{(question?.responseType === 'yes-no' || question?.responseType === 'confirm') && (
						<ToggleBool read value={JSON.parse(question?.response)} />
					)}
				</View>
				<Text style={styles.subTitle}>{question.name}</Text>
				<Paragraph>{question.description}</Paragraph>
				{question?.pictureOption && question?.picture && (
					<BorderlessButton onPress={() => setModal(true)}>
						<View accessible style={styles.viewPicture}>
							<Ionicons style={styles.viewPictureIcon} name="ios-image" />
							<Text style={styles.viewPictureText}>{t('View picture')}</Text>
						</View>
					</BorderlessButton>
				)}
				{question?.responseType === 'text' && (
					<>
						<SubTitle title={t('Explanation')} />
						<Paragraph>
							{question?.response === '' ? 'None' : question?.response ?? 'None'}
						</Paragraph>
					</>
				)}
			</View>
			{question?.pictureOption && question?.picture && (
				<ModalRead
					isVisible={modal}
					onHide={() => setModal(false)}
					text={question.name}
					imageId={question?.picture}
				/>
			)}
		</>
	);
}

export default ChecklistCardRead;

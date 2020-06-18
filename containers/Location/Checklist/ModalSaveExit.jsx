import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Modal from '../../../services/modal';
import { useHistory } from '../../../services/router';
import Title from '../../../components/Content/Title';
import styles from './styles';
import Paragraph from '../../../components/Content/Paragraph';
import { t } from '../../../services/i18n';

function ModalSaveExit({ isVisible, onHide }) {
	const history = useHistory();
	return (
		<Modal
			backdropColor={EStyleSheet.value('$white')}
			backdropOpacity={0.75}
			isVisible={isVisible}
			onBackdropPress={onHide}
			onBackButtonPress={onHide}
			animationIn="zoomIn"
			animationOut="zoomOut"
			onSwipeComplete={onHide}
			useNativeDriver
			swipeDirection={['down', 'left', 'up', 'right']}
		>
			<View style={styles.modalContainer}>
				<Title title={t('Save and Exit')} />
				<Paragraph>You can leave this checklist and continue later. All your responses will be kept</Paragraph>
				<View style={styles.content}>
					<TouchableOpacity onPress={history.goBack} style={styles.roundControl}>
						<View style={[styles.bubble, styles.bubbleInsert]}>
							<Ionicons style={styles.icon} name="md-checkmark" />
						</View>
						<Text style={styles.roundControlText}>{t('Save and Exit')}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onHide} style={styles.roundControl}>
						<View style={[styles.bubble, styles.bubbleReplace]}>
							<Feather style={styles.icon} name="edit" />
						</View>
						<Text style={styles.roundControlText}>{t('Continue')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

export default ModalSaveExit;

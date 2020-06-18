import React from 'react';
import {
	View, Text, TouchableHighlight, TouchableOpacity, Image,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, Feather } from '@expo/vector-icons';
import Modal from '../../services/modal';
import Sentry from '../../services/sentry';
import { t } from '../../services/i18n';
import { modalTakePictureStyles as styles } from './styles';

function ModalTakePicture({
	isVisible, onHide, onChooseImage, image, relaunch,
}) {
	async function openCameraRoll() {
		try {
			const res = await ImagePicker.launchImageLibraryAsync({});
			if (!res.cancelled) {
				onChooseImage(res);
				onHide();
			}
		} catch (error) {
			Sentry.captureException(error);
		}
	}

	return (
		<>
			{/* Modal when no image is in the store */}
			<Modal
				isVisible={isVisible && !image}
				backdropColor={EStyleSheet.value('$white')}
				backdropOpacity={0.75}
				animationIn="slideInUp"
				animationOut="slideOutDown"
				onBackdropPress={onHide}
				onBackButtonPress={onHide}
				useNativeDriver
			>
				<View style={styles.modalContainer}>
					<View style={styles.modal}>
						<View style={styles.controls}>
							<TouchableHighlight
								underlayColor={EStyleSheet.value('$grey')}
								onPress={openCameraRoll}
								style={styles.control}
							>
								<Text style={styles.controlText}>{t('Choose in my library')}</Text>
							</TouchableHighlight>
						</View>
						<TouchableHighlight
							underlayColor={EStyleSheet.value('$grey')}
							onPress={onHide}
							style={styles.control}
						>
							<Text style={styles.controlText}>{t('Cancel')}</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
			{/* Modal when an image is in the store */}
			<Modal
				backdropColor={EStyleSheet.value('$white')}
				backdropOpacity={0.75}
				isVisible={isVisible && (image ? !image.cancelled : false)}
				onBackdropPress={onHide}
				onBackButtonPress={onHide}
				animationIn="zoomIn"
				animationOut="zoomOut"
				onSwipeComplete={onHide}
				useNativeDriver
				swipeDirection={['down', 'left', 'up', 'right']}
				onModalHide={() => (isVisible ? relaunch() : null)}
			>
				<View style={styles.modalView}>
					<View style={styles.imageContainer}>
						{image && <Image resizeMode="contain" style={[styles.image, styles.imageWeb]} source={{ uri: image.uri }} /> }
					</View>
					<View style={styles.content}>
						<TouchableOpacity onPress={() => { onChooseImage(null); }} style={styles.roundControl}>
							<View style={[styles.bubble, styles.bubbleReplace]}>
								<Ionicons style={styles.icon} name="ios-image" />
							</View>
							<Text style={styles.roundControlText}>{t('Replace')}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onHide} style={styles.roundControl}>
							<View style={[styles.bubble, styles.bubbleInsert]}>
								<Ionicons style={styles.icon} name="md-checkmark" />
							</View>
							<Text style={styles.roundControlText}>{t('Insert')}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { onHide(); onChooseImage(null); }} style={styles.roundControl}>
							<View style={[styles.bubble, styles.bubbleDelete]}>
								<Feather style={[styles.icon, styles.iconDelete]} name="trash-2" />
							</View>
							<Text style={styles.roundControlText}>{t('Delete')}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</>
	);
}

export default ModalTakePicture;

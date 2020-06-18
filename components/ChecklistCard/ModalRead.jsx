import React from 'react';
import { View, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from '../../services/modal';
import Paragraph from '../Content/Paragraph';
import { modalReadStyles as styles } from './styles';
import API from '../../config/api';
import ImageSecured from '../../containers/ImageSecured';


function ModalRead({
	text, imageId, isVisible, onHide,
}) {
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
				<View style={styles.modalImageContainer}>
					<ImageSecured
						style={[styles.modalImage, Platform.OS === 'web' && styles.modalImageWeb]}
						resizeMode="contain"
						source={{ uri: `${API()}/action/getSecureFiles?id=${imageId}` }}
					/>
				</View>
				<View style={styles.modalContent}>
					<Paragraph>
						{text}
					</Paragraph>
				</View>
			</View>
		</Modal>
	);
}

export default ModalRead;

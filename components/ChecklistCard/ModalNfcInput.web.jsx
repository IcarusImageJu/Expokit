import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from '../../services/modal';
import Title from '../Content/Title';
import Paragraph from '../Content/Paragraph';
import { modalReadStyles as styles } from './styles';
import Control from '../Control';
import Input from '../Form/Input';


function ModalNfcInput({
	isVisible, onHide, question, onChooseNfc,
}) {
	const [input, setinput] = useState('');
	useEffect(() => {
		if (!isVisible) {
			setinput('');
		}
	}, [isVisible]);
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onHide}
			onBackButtonPress={onHide}
			animationIn="zoomIn"
			animationOut="zoomOut"
			onSwipeComplete={onHide}
			backdropColor={EStyleSheet.value('$white')}
			backdropOpacity={0.75}
			useNativeDriver
			swipeDirection={['down', 'left', 'up', 'right']}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Title title={`NFC Tag (${question.NFCTitle})`} />
					<Paragraph>
						<Text>Test</Text>
					</Paragraph>
					<Input
						placeholder="Enter NFC Tag ID"
						value={input}
						onChangeText={(value) => setinput(value)}
						onSubmitEditing={() => onChooseNfc(input)}
					/>
					<Control
						title="Submit NFC Tag ID"
						onPress={() => onChooseNfc(input)}
					/>
				</View>
			</View>
		</Modal>
	);
}

export default ModalNfcInput;

import React, { useState, useEffect } from 'react';
import {
	View, Text, Platform, TouchableOpacity, ToastAndroid,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import Paragraph from '../Content/Paragraph';
import styles, { modalTakePictureStyles } from './styles';
import login from '../../services/login';
import Control from '../Control';
import Switch from '../Form/Switch';
import Modal from '../../services/modal';
import Input from '../Form/Input';
import Title from '../Content/Title';

function ChecklistCardView({
	question, setNfcValidation, deleteNfc, addNfc, editNfc,
}) {
	// Modal visibility
	const [modalVisibility, setModalVisibility] = useState(false);
	// Modal selection
	const [modalNfc, setModalNfc] = useState(null);
	// Input tracking
	const [nfcTitle, setNfcTitle] = useState('');
	const [nfcData, setNfcData] = useState('');
	useEffect(() => {
		setNfcTitle(typeof modalNfc === 'number' ? question.NFCTitle[modalNfc] : 'No title');
		setNfcData(typeof modalNfc === 'number' ? question.NFCData[modalNfc] : String(Math.round(Math.random() * 100000)));
	}, [modalNfc, modalVisibility]);
	// Verify that the user is admin or manager
	// In order to add the writeNfc Func
	const [user, setUser] = useState({});
	async function retreiveUser() {
		const loginUser = await login.getUser();
		setUser(loginUser);
	}
	function cleanUp() {
		NfcManager.cancelTechnologyRequest().catch(() => 0);
	}
	useEffect(() => {
		retreiveUser();
		return () => {
			cleanUp();
		};
	}, []);

	async function writeToNfc() {
		try {
			if (Platform.OS === 'android') {
				ToastAndroid.show('Ready to write! Approach an NFC Tag', ToastAndroid.LONG);
			}
			await NfcManager.requestTechnology(NfcTech.Ndef, {
				alertMessage: 'Ready to write!',
			});
			await NfcManager.getNdefMessage();
			const bytes = Ndef.encodeMessage([
				Ndef.textRecord(String(nfcData)),
			]);
			await NfcManager.writeNdefMessage(bytes);
			await NfcManager.setAlertMessageIOS('Tag defined!');
			if (Platform.OS === 'android') {
				ToastAndroid.show('Tag defined!', ToastAndroid.LONG);
			}
			cleanUp();
		} catch (error) {
			console.warn(error);
			cleanUp();
		}
	}

	useEffect(() => {
		setModalVisibility(false);
	}, [question?.NFCTag]);

	return (
		<>
			<View style={styles.card}>
				<View style={styles.cardHeader}>
					<Text style={styles.title}>{`Question ${question.i + 1}`}</Text>
				</View>
				<Text style={styles.subTitle}>{question.name}</Text>
				<Paragraph>{question.description}</Paragraph>
				{(user?.addInfo1 === '0' || user?.addInfo1 === '1') && Platform.OS !== 'web' && (
					<>
						<Switch
							value={question?.NFCValidation}
							onValueChange={() => setNfcValidation(!(question?.NFCValidation ?? false))}
							label="Active NFC tag"
						/>
						{question?.NFCValidation && (
							<>
								<Control
									title="Add an NFC tag"
									onPress={() => { setModalVisibility(true); setModalNfc(null); }}
								/>
								{question?.NFCTag.length > 0 && question?.NFCTag !== '' && (
									String(question.NFCTag).split(',').map((nfcTag, i) => (
										<Control
											key={nfcTag}
											theme="altLight"
											title={`Edit '${question?.NFCTitle?.[i] ?? 'Unnamed'}' NFC tag`}
											onPress={() => { setModalVisibility(true); setModalNfc(i); }}
										/>
									))
								)}
							</>
						)}
					</>
				)}
			</View>
			<Modal
				isVisible={modalVisibility}
				backdropColor={EStyleSheet.value('$white')}
				backdropOpacity={0.75}
				animationIn="zoomIn"
				animationOut="zoomOut"
				onBackdropPress={() => setModalVisibility(false)}
				onBackButtonPress={() => setModalVisibility(false)}
				onSwipeComplete={() => setModalVisibility(false)}
				swipeDirection={['down', 'left', 'up', 'right']}
				useNativeDriver
			>
				<View style={modalTakePictureStyles.modalView}>
					<View style={modalTakePictureStyles.content}>
						<View style={{ flex: 1 }}>
							<Title>{typeof modalNfc === 'number' ? 'Edit NFC tag' : 'Add NFC tag'}</Title>
							<Input
								placeholder="Name"
								value={nfcTitle}
								onChangeText={setNfcTitle}
							/>
							<Input
								placeholder="NFC tag code"
								value={nfcData}
								onChangeText={setNfcData}
							/>
						</View>
					</View>
					<View style={modalTakePictureStyles.content}>
						<TouchableOpacity
							onPress={writeToNfc}
							style={modalTakePictureStyles.roundControl}
						>
							<View style={[modalTakePictureStyles.bubble, modalTakePictureStyles.bubbleReplace]}>
								<MaterialIcons style={modalTakePictureStyles.icon} name="nfc" />
							</View>
							<Text style={modalTakePictureStyles.roundControlText}>Write on an NFC Tag</Text>
						</TouchableOpacity>
						{typeof modalNfc === 'number' && (
							<>
								<TouchableOpacity
									onPress={() => { editNfc(nfcTitle, nfcData, modalNfc); setModalVisibility(false); }}
									style={modalTakePictureStyles.roundControl}
								>
									<View style={[modalTakePictureStyles.bubble, modalTakePictureStyles.bubbleInsert]}>
										<Ionicons style={modalTakePictureStyles.icon} name="md-checkmark" />
									</View>
									<Text style={modalTakePictureStyles.roundControlText}>Save</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => deleteNfc(modalNfc)}
									style={modalTakePictureStyles.roundControl}
								>
									<View style={[modalTakePictureStyles.bubble, modalTakePictureStyles.bubbleDelete]}>
										<Feather style={[modalTakePictureStyles.icon, modalTakePictureStyles.iconDelete]} name="trash-2" />
									</View>
									<Text style={modalTakePictureStyles.roundControlText}>Delete</Text>
								</TouchableOpacity>
							</>
						)}
						{typeof modalNfc !== 'number' && (
							<>
								<TouchableOpacity onPress={() => addNfc(nfcTitle, nfcData)} style={modalTakePictureStyles.roundControl}>
									<View style={[modalTakePictureStyles.bubble, modalTakePictureStyles.bubbleInsert]}>
										<Ionicons style={modalTakePictureStyles.icon} name="md-checkmark" />
									</View>
									<Text style={modalTakePictureStyles.roundControlText}>Add</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => setModalVisibility(false)} style={modalTakePictureStyles.roundControl}>
									<View style={[modalTakePictureStyles.bubble, modalTakePictureStyles.bubbleDelete]}>
										<Feather style={[modalTakePictureStyles.icon, modalTakePictureStyles.iconDelete]} name="trash-2" />
									</View>
									<Text style={modalTakePictureStyles.roundControlText}>Cancel</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</View>
			</Modal>
		</>
	);
}

export default ChecklistCardView;

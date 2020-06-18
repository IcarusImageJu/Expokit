import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'expo';
import Title from '../../components/Content/Title';
// import { t } from '../../services/i18n';
import Paragraph from '../../components/Content/Paragraph';
import SubTitle from '../../components/Content/SubTitle';
import styles from './styles';
import IconHeader from '../../components/IconHeader';
import LoginContact from '../Login/LoginContact';


function Contact() {
	return (
		<KeyboardAvoidingView behavior="padding" enabled>
			<ScrollView>
				<View style={styles.heading}>
					<Title title="Contact us" />
					<IconHeader
						// title={t('contactPageSubTitle')}
						color={EStyleSheet.value('$peach')}
						icon="ios-send"
					/>
					<SubTitle>Or call us</SubTitle>
					<Paragraph onPress={() => Linking.openURL('tel:289-434-5510')}>289-434-5510</Paragraph>
				</View>
				<View style={styles.content}>
					<LoginContact inApp />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default Contact;

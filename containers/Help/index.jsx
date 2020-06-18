import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ScrollView } from 'react-native-gesture-handler';
import Content from '../../components/Content/Content';
import Paragraph from '../../components/Content/Paragraph';
import SubTitle from '../../components/Content/SubTitle';
import Title from '../../components/Content/Title';
import IconHeader from '../../components/IconHeader';
import { t } from '../../services/i18n';
import styles from './styles';

function Help() {
	return (
		<ScrollView contentContainerStyle={styles.scrollInner}>
			<View style={styles.heading}>
				<Title title={t('helpPageTitle')} />
				<IconHeader
					title={t('helpPageSubTitle')}
					color={EStyleSheet.value('$blueLight')}
					icon="md-help"
				/>
			</View>
			<Content flex>
				<SubTitle>QR Code Scanning</SubTitle>
				<Paragraph>If you are having trouble scanning a QR code to find a location:</Paragraph>
				<Paragraph>•	Ensure that you have allowed the Safe building app to access your camera.</Paragraph>
				<Paragraph>•	The QR code must be well lit to scan correctly, try enabling your device&apos;s flash.</Paragraph>
				<Paragraph>•	You can only access locations that you have permission to see, ensure you are allowed to view the QR code&apos;s location.</Paragraph>
				<Paragraph>•	You can only scan QR codes using a compatible mobile device.</Paragraph>
				<SubTitle>Finding a Location</SubTitle>
				<Paragraph>•	You can view a list of the locations you have permission to see on the Home screen.</Paragraph>
				<Paragraph>•	Use the search bar on the Home screen to find a location by its name or address.</Paragraph>
				<Paragraph>•	Scanning a Safe Buildings QR code will direct you to the location&apos;s page if you have access.</Paragraph>
				<SubTitle>View Site Plans and Documents</SubTitle>
				<Paragraph>•	Site Plans and documents are in PDF format and Safe Buildings requires access to your native system PDF viewer or other document viewing app.</Paragraph>
				<Paragraph>•	Some documents may be very large and will take a while to load on slower connections.</Paragraph>
				<SubTitle>Login Issues</SubTitle>
				<Paragraph>1.	Please snsure you have an active secure internet connection</Paragraph>
				<Paragraph>2.	Please ensure you are using the correct login email and password</Paragraph>
				<Paragraph>3.	If you are unable to remember you password please click forgot password and follow the instructions</Paragraph>
				<Paragraph>4.	If this still does not resolve your issue please contact us at support@safebuildings.ca or 289-434-5510</Paragraph>
			</Content>
		</ScrollView>
	);
}

export default Help;

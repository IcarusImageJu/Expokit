import React from 'react';
import { View, Text, Platform } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { useHistory } from '../../services/router';
import { t } from '../../services/i18n';

import Separator from '../Separator';
import SubTitle from '../Content/SubTitle';
import Paragraph from '../Content/Paragraph';
import styles from './styles';
import ENUM_TYPE_CHECKLIST from '../../constants/enumTypeChecklist';


function NotificationCard({ notification, onDelete }) {
	const history = useHistory();
	function SubTitleType() {
		switch (notification.field3) {
			case '0':
				return <SubTitle title={t('Response')} />;
			case '1':
				return <SubTitle title={t('Reminder')} />;
			case '2':
				return <SubTitle title={t('New user')} />;
			case '3':
				return <SubTitle title={t('New location')} />;
			default:
				return null;
		}
	}

	function link() {
		switch (notification.field3) {
			case '0':
				if (notification?.response?.field2 || notification?.checklist?.id) {
					return {
						pathname: `/location/${notification.location.id}/checklist/${notification?.checklist?.id ?? notification.response.field2}/${notification.field5}`,
						state: { type: ENUM_TYPE_CHECKLIST.READ },
					};
				}
				return `/location/${notification.location.id}`;
			case '1':
				if (notification?.checklist?.id) {
					return `/location/${notification.location.id}/button/${notification.checklist.field5}/checklist`;
				}
				return `/location/${notification.location.id}`;
			case '2':
				return `/location/${notification.location.id}`;
			case '3':
				return `/location/${notification.location.id}`;
			default:
				return '';
		}
	}
	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.innerContainer}
			showsHorizontalScrollIndicator={Platform.OS === 'web'}
			horizontal
			snapToOffsets={[0, 200]}
			snapToAlignment="start"
		>
			<View style={[
				styles.card,
				notification.field4 === 'false' && styles.cardIsNew,
				Platform.OS === 'web' && styles.cardWeb,
			]}
			>
				<Text style={styles.title}>{notification.location.field2}</Text>
				<Separator />
				<SubTitleType />
				{notification?.field6 === 'true' && (
					<View style={styles.urgentPill}>
						<Ionicons name="md-warning" style={styles.urgentIcon} />
						<Text style={styles.urgentText}>{t('Urgent')}</Text>
					</View>
				)}
				{(notification.field3 === '0' || notification.field3 === '1') && (
					<Paragraph>
						{notification?.checklist?.field2 ?? '... Loading checklist title'}
					</Paragraph>
				)}
				<Paragraph>
					{notification.dateField1}
				</Paragraph>
			</View>
			<View style={styles.controlsContainer}>
				<RectButton onPress={() => history.push(link())}>
					<View accessible style={[styles.control, styles.controlGo]}>
						<Ionicons style={[styles.controlIcon, styles.controlIconGo]} name="ios-arrow-round-forward" />
					</View>
				</RectButton>
				<RectButton onPress={onDelete}>
					<View accessible style={[styles.control, styles.controlCancel]}>
						<Ionicons style={[styles.controlIcon, styles.controlIconCancel]} name="ios-close" />
					</View>
				</RectButton>
			</View>
		</ScrollView>
	);
}

export default NotificationCard;

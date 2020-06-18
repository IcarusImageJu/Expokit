import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { t } from '../../services/i18n';
import styles from './styles';

function ToggleBool({
	value = null,
	onPress,
	truthy = t('Yes'),
	falsy = t('No'),
	read,
	radio,
}) {
	const currentPose = () => {
		switch (value) {
			case null:
				return 'neutral';
			case false:
				return 'falsy';
			default:
				return 'truthy';
		}
	};
	if (read) {
		if (currentPose() === 'neutral') {
			return null;
		}
		return (
			<View
				pose="enter"
				initialPose="exit"
				style={[
					styles.readContainer,
					currentPose() === 'truthy' ? styles.readContainerTruthy : styles.readContainerFalsy,
				]}
			>
				<Text style={[styles.text, styles.textActive]}>{currentPose() === 'truthy' ? truthy : falsy}</Text>
			</View>
		);
	}
	if (radio) {
		return (
			<BorderlessButton
				onPress={() => onPress(currentPose() === 'truthy' ? null : true)}
				style={[
					styles.readContainer,
					currentPose() === 'truthy' && styles.readContainerTruthy,
					currentPose() === 'falsy' && styles.readContainerFalsy,
				]}
			>
				<Text style={[styles.text, (currentPose() === 'falsy' || currentPose() === 'truthy') && styles.textActive]}>{truthy || falsy}</Text>
			</BorderlessButton>
		);
	}
	return (
		<View style={styles.section}>
			<BorderlessButton
				style={[styles.container, currentPose() === 'truthy' && styles.readContainerTruthy]}
				onPress={() => onPress(currentPose() === 'truthy' ? null : true)}
			>
				<View accessible style={styles.innerContainer}>
					<View style={styles.content}>
						<Text style={[styles.text, currentPose() === 'truthy' && styles.textActive]}>{truthy}</Text>
					</View>
				</View>
			</BorderlessButton>
			<BorderlessButton
				style={[styles.container, styles.container2, currentPose() === 'falsy' && styles.readContainerFalsy]}
				onPress={() => onPress(currentPose() === 'falsy' ? null : false)}
			>
				<View accessible style={styles.innerContainer}>
					<View style={styles.content}>
						<Text style={[styles.text, currentPose() === 'falsy' && styles.textActive]}>{falsy}</Text>
					</View>
				</View>
			</BorderlessButton>
		</View>
	);
}

export default ToggleBool;

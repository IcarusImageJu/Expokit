import React from 'react';
import {
	Text, ActivityIndicator, View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import capitalize from '../../utils/capitalize';

function Control({
	title, children, onPress, theme, loading = false, icon, small,
}) {
	return (
		<RectButton
			style={[
				styles.control,
				theme && styles[`control${theme}`],
				loading && styles.controlLoading,
				theme && loading && styles[`controlLoading${theme}`],
				small && styles.controlSmall,
			]}
			onPress={loading ? null : onPress}
			underlayColor={EStyleSheet.value('$blueDark')}
		>
			<View style={styles.innerControl} accessible>
				{loading ? (
					<ActivityIndicator size="small" color={EStyleSheet.value('$white')} />
				) : (
					<>
						{icon && <Ionicons name={icon} style={[styles.icon, theme && styles[`icon${theme}`]]} />}
						<Text style={[styles.text, theme && styles[`text${theme}`]]}>{capitalize(children || title)}</Text>
					</>
				)}

			</View>
		</RectButton>
	);
}

export default Control;

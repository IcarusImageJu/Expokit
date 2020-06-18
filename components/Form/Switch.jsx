import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { stylesSwitch } from './styles';
import ToggleBool from '../ToggleBool/index';
import { t } from '../../services/i18n';

function LabeledSwitch({
	children, label, value, onValueChange,
}) {
	return (
		<View style={stylesSwitch.container}>
			<RectButton onPress={() => onValueChange(!value)}>
				<View accessible>
					<Text style={stylesSwitch.label}>{`${children || label}:`}</Text>
				</View>
			</RectButton>
			<ToggleBool
				value={value}
				onPress={onValueChange}
				truthy={value ? t('Yes') : t('No')}
				radio
			/>
		</View>
	);
}

export default LabeledSwitch;

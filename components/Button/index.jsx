import React from 'react';
import {
	Text, View, TouchableHighlight,
} from 'react-native';
import { useHistory } from '../../services/router';
import styles from './styles';
import ENUM_TYPE_BUTTON from '../../constants/enumTypeButton';

function Button({
	children, content, onPress, locationId, buttonId, type,
}) {
	const history = useHistory();
	const to = () => {
		switch (Number(type)) {
			case ENUM_TYPE_BUTTON.DOCUMENT:
				return `/location/${locationId}/document/${buttonId}`;
			case ENUM_TYPE_BUTTON.CHECKLIST:
				return `/location/${locationId}/button/${buttonId}/checklist`;
			case ENUM_TYPE_BUTTON.FIELD:
				return `/location/${locationId}/button/${buttonId}/field`;
			default:
				return `/location/${locationId}/button/${buttonId}`;
		}
	};
	function controlled() {
		if (onPress) {
			onPress();
		}
		history.push(to());
	}

	return (
		<TouchableHighlight onPress={controlled} style={styles.link}>
			<View style={styles.shadow}>
				<View style={styles.container}>
					<Text style={styles.text}>{children || content}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
}

export default Button;

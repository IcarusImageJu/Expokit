import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import { useHistory } from '../../services/router';
import styles from './styles';

function BoxInfosControl({
	icon, children, title, type, to,
}) {
	const history = useHistory();
	const renderedIcon = () => {
		switch (type) {
			case 'Entypo':
				return <Entypo style={styles.icon} name={icon} />;
			case 'Feather':
				return <Feather style={styles.icon} name={icon} />;
			default:
				return <Ionicons style={styles.icon} name={icon} />;
		}
	};

	return (
		<RectButton onPress={() => history.push(to)}>
			<View accessible style={styles.container}>
				{renderedIcon()}
				<Text style={styles.text}>{children || title}</Text>
			</View>
		</RectButton>
	);
}

export default BoxInfosControl;

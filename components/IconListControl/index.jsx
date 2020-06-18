import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useHistory } from '../../services/router';
import styles from './styles';

function IconListControl({
	color, to, icon, children, title, iconType, onPress,
}) {
	const history = useHistory();
	const iconRendered = () => {
		switch (iconType) {
			case 'Feather':
				return <Feather style={styles.icon} name={icon} />;
			default:
				return <Ionicons style={styles.icon} name={icon} />;
		}
	};
	return (
		<TouchableOpacity style={styles.container} onPress={() => (to ? history.push(to) : onPress())}>
			<View style={[styles.iconContainer, { backgroundColor: color }]}>
				{iconRendered()}
			</View>
			<Text style={styles.title}>{children || title}</Text>
		</TouchableOpacity>
	);
}

export default IconListControl;

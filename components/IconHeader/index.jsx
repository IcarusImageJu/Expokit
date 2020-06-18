import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import ColorOperation from 'color';
import styles from './styles';

function IconHeader({
	icon, title, children, color, iconType,
}) {
	const iconRenderer = () => {
		switch (iconType) {
			case 'Feather':
				return (
					<Feather
						style={styles.icon}
						name={icon}
						color={color}
						size={EStyleSheet.value('1.5rem')}
					/>
				);
			default:
				return (
					<Ionicons
						style={styles.icon}
						name={icon}
						color={color}
						size={EStyleSheet.value('1.5rem')}
					/>
				);
		}
	};
	return (
		<View style={styles.container}>
			{icon && (
				<View
					style={[
						styles.iconContainer, {
							borderColor: color,
							backgroundColor: ColorOperation(color).alpha(0.1),
						}]}
				>
					{iconRenderer()}
				</View>
			)}
			<Text style={styles.title}>
				{title || children}
			</Text>
		</View>
	);
}

export default IconHeader;

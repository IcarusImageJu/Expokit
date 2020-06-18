import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

function Paragraph({ children, content, center }) {
	return (
		<Text style={[styles.paragraph, center && styles.paragraphCenter]}>{children || content}</Text>
	);
}

export default Paragraph;

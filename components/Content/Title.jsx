import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

function Title({ title, children }) {
	return (
		<Text style={styles.title}>{children || title}</Text>
	);
}

export default Title;

import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

function SubTitle({ title, children, capitalize }) {
	let content = children || title;

	if (capitalize && content) {
		content = content.charAt(0).toUpperCase() + content.slice(1);
	}
	return (
		<Text style={styles.subTitle}>{content}</Text>
	);
}

export default SubTitle;

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Title from '../Content/Title';
import styles from './styles';
import HtmlParser from '../HtmlParser';

function ButtonHeader({
	title, children, icon, context, location,
}) {
	const subtitle = () => {
		if (context) {
			return (
				<View style={styles.subTitleHtml}>
					<HtmlParser html={context || ''} noMargin />
				</View>
			);
		}
		return <Text style={styles.subTitleText}>{context}</Text>;
	};
	return (
		<View style={styles.container}>
			{location && <Title title={location} />}
			<View style={styles.subTitle}>
				<Ionicons style={styles.subTitleIcon} name={icon} />
				{subtitle()}
			</View>
			<Title title={title || children} />
		</View>
	);
}

export default ButtonHeader;

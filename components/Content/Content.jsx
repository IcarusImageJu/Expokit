import React from 'react';
import { View } from 'react-native';

import styles from './styles';

function Content({ children, flex, noPaddingHorizontal }) {
	return (
		<View
			style={[
				styles.content,
				flex && { flex: 1 },
				noPaddingHorizontal && { paddingHorizontal: 0 },
			]}
		>
			{children}
		</View>
	);
}

export default Content;

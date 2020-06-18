import React from 'react';
import { View } from 'react-native';

import styles from './styles';

function Separator({
	small, blank, flat, light,
}) {
	return (
		<View
			style={[
				styles.separator,
				small && styles.separatorSmall,
				blank && styles.separatorBlank,
				flat && styles.separatorFlat,
				light && styles.separatorLight,
			]}
		/>
	);
}

export default Separator;

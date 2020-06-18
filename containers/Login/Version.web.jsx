import React from 'react';
import { Text } from 'react-native';
import Constants from 'expo-constants';

import styles from './styles';
import env, { isInDevelopment } from '../../constants/env';

function Version() {
	if (!isInDevelopment) {
		return (
			<Text style={styles.version}>
				{`version : ${Constants.manifest.version}`}
			</Text>
		);
	}
	return (
		<Text style={styles.version}>
			{`'version' : ${Constants.manifest.version} | Environment: ${env}`}
		</Text>
	);
}

export default Version;

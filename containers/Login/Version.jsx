import React from 'react';
import { Text } from 'react-native';
import Constants from 'expo-constants';
import { t } from '../../services/i18n';

import styles from './styles';
import env, { isInDevelopment } from '../../constants/env';

function Version() {
	if (!isInDevelopment) {
		return (
			<Text style={styles.version}>
				{`${t('version')} : ${Constants.manifest.version}`}
			</Text>
		);
	}
	return (
		<Text style={styles.version}>
			{`${t('version')} : ${Constants.manifest.version} | Environment: ${env}`}
		</Text>
	);
}

export default Version;
